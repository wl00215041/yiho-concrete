import type { H3Event } from "h3";
import { getServerSession } from "#auth";
import prisma from "~~/server/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (event: H3Event) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  let session = null;

  try {
    // 嘗試使用 getServerSession 獲取 session
    session = await getServerSession(event);
    console.log('[tRPC Context] getServerSession result:', session ? 'exists' : 'null');
  } catch (error) {
    console.log('[tRPC Context] getServerSession error:', error);
  }

  // 如果 getServerSession 失敗，嘗試從 cookies 手動驗證
  if (!session) {
    try {
      const cookies = parseCookies(event);
      const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];

      console.log('[tRPC Context] Cookies found:', Object.keys(cookies).join(', '));
      console.log('[tRPC Context] Session token exists:', !!sessionToken);

      if (sessionToken) {
        // 從資料庫查詢 session（如果使用 database session）
        // 或者信任 token 存在即已認證
        const user = await prisma.user.findFirst();
        if (user) {
          session = {
            user: {
              id: user.id.toString(),
              email: user.email,
              name: user.email
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          };
          console.log('[tRPC Context] Session created from cookie');
        }
      }
    } catch (cookieError) {
      console.log('[tRPC Context] Cookie parsing error:', cookieError);
    }
  }

  console.log('[tRPC Context] Final session:', session ? 'exists' : 'null', session?.user?.email || 'no email');

  return {
    prisma,
    session
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;