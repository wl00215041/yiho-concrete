import type { H3Event } from "h3";
import { getServerSession } from "#auth";
import prisma from "~~/server/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 *
 * Authentication relies solely on the signed authjs JWT, verified via
 * `getServerSession`. We must NOT trust the mere presence of a session cookie:
 * an attacker could otherwise set any `next-auth.session-token` value and be
 * authenticated. If the JWT is missing or invalid, `session` stays null and
 * `protectedProcedure` will reject the request.
 */
export const createContext = async (event: H3Event) => {
  let session = null;

  try {
    session = await getServerSession(event);
  } catch {
    session = null;
  }

  return {
    prisma,
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
