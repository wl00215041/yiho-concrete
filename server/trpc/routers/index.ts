import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc';

export const appRouter = router({

  userList: publicProcedure.query(async () => {
    return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
  })

});

export type AppRouter = typeof appRouter;