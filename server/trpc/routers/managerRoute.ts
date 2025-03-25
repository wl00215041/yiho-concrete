import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

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
    getAchievementYears: adminProcedure.query(async () => {
      return prisma.achievementYear.findMany()
    }),
    getAchievementGalleryYears: adminProcedure.query(async () => {
      return prisma.achievementGalleryYear.findMany()
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
  })