import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';
import { ServerFile } from "nuxt-file-storage";
const prisma = new PrismaClient()

export const adminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  // if (!ctx.user?.isAdmin) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  // return opts.next({
  //   ctx: {
  //     user: ctx.user,
  //   },
  // });
  return opts.next({
    ctx: {
      user: { isAdmin: true },
    },
  });
});


export default router({
    getJobs: adminProcedure.query(async () => {
      return prisma.jobs.findMany()
    }),
    addAchievementYear: adminProcedure.input(z.object({ year: z.number() })).mutation(async (opts) => {
      const existedYear = await prisma.achievementYear.findFirst({ where: { year: opts.input.year } });
      if (existedYear) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Year already exists' });
      }
      return prisma.achievementYear.create({
        data: {
          year: opts.input.year
        }
      })
    }),
    addAchievementGalleryYear: adminProcedure.input(z.object({ year: z.number() })).mutation(async (opts) => {
      const existedYear = await prisma.achievementGalleryYear.findFirst({ where: { year: opts.input.year } });
      if (existedYear) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Year already exists' });
      }
      return prisma.achievementGalleryYear.create({
        data: {
          year: opts.input.year
        }
      })
    }),
    getGalleryById: adminProcedure.input(z.number()).query(async (opts) => {
      const gallery = await prisma.achievementGallery.findFirst({ where: { id: opts.input }, include: { images: true } });
      if (!gallery) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Gallery not found' });
      }
      return gallery
    }),
    batchDeleteGalleries: adminProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const galleries = await prisma.achievementGallery.findMany({ where: { id: { in: opts.input } }, include: { images: true } });
      if (galleries.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'No galleries found' });
      }
      for (const gallery of galleries) {
        const images = gallery.images;
        for (const image of images) {
          try {
            await deleteFile(image.file, '/achievements')
          } catch (e) {
            console.error(e)
          }
        }
      }
      return prisma.achievementGallery.deleteMany({ where: { id: { in: opts.input } } })
    }),
    getAchievementYears: adminProcedure.query(async () => {
      return prisma.achievementYear.findMany({orderBy: { year: 'desc' }})
    }),
    getAchievementGalleryYears: adminProcedure.query(async () => {
      return prisma.achievementGalleryYear.findMany({orderBy: { year: 'desc' }})
    }),
    addAchievement: adminProcedure.input(z.object({ year: z.number(), name: z.string(), manufacturer: z.string() })).mutation(async (opts) => {
      const year = await prisma.achievementYear.findFirst({ where: { year: opts.input.year } });
      return prisma.achievementItem.create({
        data: {
          name: opts.input.name,
          manufacturer: opts.input.manufacturer,
          created_at: (new Date()).toISOString(),
          fk_year_id: year?.id || 0
        }
      })
    }),
    getAchievements: adminProcedure.input(Number).query(async (opts) => {
      const year = await prisma.achievementYear.findFirst({ where: { year: opts.input } });
      return prisma.achievementItem.findMany({ where: { fk_year_id: year?.id } })
    }),
    getAchievementGalleryList: adminProcedure.input(Number).query(async (opts) => {
      const year = await prisma.achievementGalleryYear.findFirst({ where: { year: opts.input } });
      return prisma.achievementGallery.findMany({ where: { fk_year_id: year?.id }, include: { images: true } })
    }),
    batchDeleteAchievements: adminProcedure.input(z.array(z.number())).mutation(async (opts) => {
      return prisma.achievementItem.deleteMany({ where: { id: { in: opts.input } } })
    }),
    addJob: adminProcedure.input(z.object({ name: z.string(), experience: z.string(), education: z.string(), link: z.string().optional() })).mutation(async (opts) => {
      return prisma.jobs.create({
        data: {
          name: opts.input.name,
          experience: opts.input.experience,
          education: opts.input.education,
          link: opts.input.link,
          created_at: (new Date()).toISOString(),
          updated_at: (new Date()).toISOString()
        }
      })
    }),
    batchDeleteJobs: adminProcedure.input(z.array(z.number())).mutation(async (opts) => {
      return prisma.jobs.deleteMany({ where: { id: { in: opts.input } } })
    }),
    getCertificationsByType: adminProcedure.input(z.string()).query(async (opts) => {
      return prisma.certifications.findMany({ where: { type: opts.input } })
    }),
    batchDeleteCertification: adminProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const certifications = await prisma.certifications.findMany({ where: { id: { in: opts.input } } });
      if (certifications.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'No certifications found' });
      }
      for (const certification of certifications) {
        if (!certification.file) {
          continue
        }
        try {
          await deleteFile(certification.file, '/certifications')
        } catch (e) {
          console.error(e)
        }
      }

      return prisma.certifications.deleteMany({ where: { id: { in: opts.input } } })
    }),
    getCertificationById: adminProcedure.input(z.number()).query(async (opts) => {
      const certification = await prisma.certifications.findFirst({ where: { id: opts.input } });
      if (!certification) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Certification not found' });
      }
      return certification
    }),
    getNews: adminProcedure.query(async () => {
      return prisma.news.findMany({
        orderBy: { created_at: 'desc' }
      })
    }),
    addNews: adminProcedure.input(z.object({ title: z.string(), link: z.string() })).mutation(async (opts) => {
      return prisma.news.create({
        data: {
          title: opts.input.title,
          link: opts.input.link,
          created_at: (new Date()).toISOString()
        }
      })
    }),
    batchDeleteNews: adminProcedure.input(z.array(z.number())).mutation(async (opts) => {
      return prisma.news.deleteMany({ where: { id: { in: opts.input } } })
    }),
  })