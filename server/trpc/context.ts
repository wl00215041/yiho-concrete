import type { H3Event } from "h3";
import { inferAsyncReturnType } from "@trpc/server";
import { getServerSession } from "#auth";
import prisma from "~/server/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (event: H3Event) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // 使用 @sidebase/nuxt-auth 提供的 getServerSession 獲取 session
  const session = await getServerSession(event);

  return {
    prisma,
    session
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;