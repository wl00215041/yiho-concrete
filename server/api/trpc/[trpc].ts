import { createTRPCNuxtHandler } from 'trpc-nuxt/server'
import { appRouter } from '~~/server/trpc/routers'
import { createContext } from "~~/server/trpc/context";

// export API handler
export default createTRPCNuxtHandler({
  router: appRouter,
  createContext: createContext
})