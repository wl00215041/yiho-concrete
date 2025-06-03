import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // 只處理 tRPC API 請求
  if (!event.node.req.url?.includes('/api/trpc/')) {
    return
  }

  // 如果 session 不存在，嘗試從 auth API 獲取
  if (!event.context.session) {
    try {
      // 嘗試從 cookies 獲取 session
      const cookies = parseCookies(event);

      // 檢查是否有 session token
      const sessionToken = cookies['next-auth.session-token'] ||
                          cookies['__Secure-next-auth.session-token'] ||
                          cookies['authjs.session-token'] ||
                          cookies['__Secure-authjs.session-token'];

      if (sessionToken) {
        // 從 auth API 獲取完整 session
        try {
          const sessionResponse = await $fetch('/api/auth/session', {
            headers: {
              cookie: event.node.req.headers.cookie || ''
            }
          });
          
          if (sessionResponse && sessionResponse.user) {
            event.context.session = sessionResponse;
          }
        } catch (authError) {
          // 靜默處理錯誤，避免影響正常流程
        }
      }
    } catch (error) {
      // 靜默處理錯誤，避免影響正常流程
    }
  }
})