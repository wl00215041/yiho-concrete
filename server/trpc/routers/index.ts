import prisma from "~~/server/prisma";
import { publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import managerRoute from './managerRoute';
import products from '~~/constants/products';

export const appRouter = router({
  productList: publicProcedure.query(async () => {
    return products
  }),
  productById: publicProcedure.input(Number).query(async (opt) => {
    return products.find(p => p.id === opt.input)
  }),
  userList: publicProcedure.query(async () => {
    return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
  }),
  getHomeAnnouncements: publicProcedure.query(async () => {
    const latestNews = await prisma.news.findFirst({
      orderBy: { created_at: 'desc' }
    })
    const latestAchievement = await prisma.achievementGallery.findFirst({
      orderBy: { created_at: 'desc' }
    })
    const latestQuality = await prisma.certifications.findFirst({
      orderBy: { created_at: 'desc' }
    })
    return {
      news: latestNews,
      achievement: latestAchievement,
      quality: latestQuality
    }
  }),
  getTop4Gallery: publicProcedure.query(async () => {
    return prisma.achievementGallery.findMany({ where: { pinned_at: { not: '' } }, orderBy: { pinned_at: 'desc' }, include: { images: true }, take: 4 })
  }),
  getGalleryByYear: publicProcedure
  .input(z.object({
    year: z.number(),
    page: z.number().default(1)  // 默認為第一頁
  }))
  .query(async (opt) => {
    const page = opt.input.page;
    const pageSize = 10;  // 每頁 10 筆數據
    const skip = (page - 1) * pageSize;
    
    const year = await prisma.achievementGalleryYear.findFirst({ 
      where: { year: opt.input.year } 
    });
    
    if (!year && opt.input.year > 0) {
      return {
        data: [],
        total: 0,
        page: page,
        pageSize: pageSize,
        totalPages: 0
      };
    }
    
    const total = await prisma.achievementGallery.count({
      where: { fk_year_id: year?.id }
    });
    
    const totalPages = Math.ceil(total / pageSize);
    
    const data = await prisma.achievementGallery.findMany({
      where: { fk_year_id: year?.id },
      include: { images: true },
      skip: skip,
      take: pageSize,
      orderBy: { created_at: 'desc' }
    });
    
    return {
      data: data,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: totalPages
    };
  }),
  getAchievementsByYear: publicProcedure.input(z.number()).query(async (opt) => {
    if (opt.input < 0) {
      return prisma.achievementItem.findMany()
    }
    const year = await prisma.achievementYear.findFirst({ where: { year: opt.input } })
    if (!year) {
      return []
    }
    return prisma.achievementItem.findMany({ where: { fk_year_id: year?.id } })
  }),
  getAllAchievementYears: publicProcedure.query(async () => {
    const galleryYears = await prisma.achievementGalleryYear.findMany({ orderBy: { year: 'desc' } })
    const achievementYears = await prisma.achievementYear.findMany({ orderBy: { year: 'desc' } })
    const years = new Set([...galleryYears, ...achievementYears].map(y => y.year))
    return Array.from(years).sort((a, b) => b - a)
  }),
  getGalleryById: publicProcedure.input(z.number()).query(async (opt) => {
    return prisma.achievementGallery.findFirst({ where: { id: opt.input }, include: { images: true } })
  }),
  getJobs: publicProcedure.query(async () => {
    return prisma.jobs.findMany()
  }),
  getSystemInfo: publicProcedure.query(async () => {
    const userCount = await prisma.user.count()
    return {
      init: userCount > 0,
    }
  }),
  createDefaultUser: publicProcedure.input(z.object({ username: z.string(), password: z.string() })).mutation(async (opt) => {
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(opt.input.password)
    return prisma.user.create({
      data: {
        email: opt.input.username,
        password: hashedPassword,
      }
    })
  }),
  getCertifications: publicProcedure.query(async () => {
    return prisma.certifications.findMany()
  }),
  getEsgDocuments: publicProcedure.query(async () => {
    return prisma.certifications.findMany({
      where: { type: 'esg' },
      orderBy: { created_at: 'desc' }
    })
  }),
  getAnnouncements: publicProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async (opt) => {
      const pageSize = 10

      const [newsItems, certifications, galleries] = await Promise.all([
        prisma.news.findMany(),
        prisma.certifications.findMany(),
        prisma.achievementGallery.findMany(),
      ])

      const items = [
        ...galleries.map((g) => ({
          id: `a-${g.id}`,
          type: 'achievement' as const,
          title: g.name,
          date: g.created_at,
          link: `/achievements/${g.id}`,
          linkTarget: '_self' as const,
        })),
        ...certifications.map((c) => ({
          id: `q-${c.id}`,
          type: 'certification' as const,
          title: c.name,
          date: c.created_at,
          link: c.file ? `/files/certifications/${c.file}` : '',
          linkTarget: '_self' as const,
        })),
        ...newsItems.map((n) => ({
          id: `n-${n.id}`,
          type: 'news' as const,
          title: n.title,
          date: n.created_at,
          link: n.link,
          linkTarget: '_blank' as const,
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      const total = items.length
      const start = (opt.input.page - 1) * pageSize

      return {
        data: items.slice(start, start + pageSize),
        total,
        page: opt.input.page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    }),
  manager: managerRoute
});

export type AppRouter = typeof appRouter;