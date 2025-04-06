import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import managerRoute from './managerRoute';
import products from '~/constants/products';

const prisma = new PrismaClient()

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
    const latestAchievement = await prisma.achievementItem.findFirst({
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
    return prisma.achievementGallery.findMany({ orderBy: { created_at: 'desc' }, include: { images: true }, take: 4 })
  }),
  getGalleryByYear: publicProcedure.input(z.number()).query(async (opt) => {
    const year = await prisma.achievementGalleryYear.findFirst({ where: { year: opt.input } })
    return prisma.achievementGallery.findMany({ where: { fk_year_id: year?.id }, include: { images: true } })
  }),
  getAchievementsByYear: publicProcedure.input(z.number()).query(async (opt) => {
    const year = await prisma.achievementYear.findFirst({ where: { year: opt.input } })
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
  manager: managerRoute
});

export type AppRouter = typeof appRouter;