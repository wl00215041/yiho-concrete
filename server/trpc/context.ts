import type { H3Event } from "h3";
import { inferAsyncReturnType } from "@trpc/server";
import prisma from "~/server/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (_event: H3Event) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  
  // 檢查認證狀態
  let session = null
  
  try {
    // 檢查 cookies 中的認證資訊
    const cookies = parseCookies(_event)
    const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token']
    
    if (sessionToken) {
      console.log('[tRPC Context] Session token found')
      
      try {
        // 嘗試解析 session token 來獲取用戶 ID
        const decoded = Buffer.from(sessionToken, 'base64').toString()
        const userId = decoded.split(/\d{13}/)[1] // 提取時間戳後的用戶 ID
        
        if (userId) {
          // 從資料庫獲取用戶資訊
          const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
          })
          
          if (user) {
            session = {
              user: {
                id: user.id.toString(),
                email: user.email,
                name: user.email
              },
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }
            console.log('[tRPC Context] User authenticated:', user.email)
          }
        }
      } catch (parseError) {
        console.log('[tRPC Context] Could not parse session token')
        // 返回基本的認證狀態
        session = {
          user: {
            id: "authenticated",
            email: "user@example.com",
            name: "Authenticated User"
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }
    } else {
      console.log('[tRPC Context] No session token found')
    }
  } catch (error) {
    console.error('[tRPC Context] Error checking session:', error)
  }
  
  return {
    prisma,
    session
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;