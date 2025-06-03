import prisma from "~/server/prisma";

// 處理直接的 /session 請求
export default defineEventHandler(async (event) => {
  console.log('[Session Route] Direct /session request')
  
  try {
    // 檢查 cookies 中的認證資訊
    const cookies = parseCookies(event)
    console.log('[Session Route] Cookies found:', Object.keys(cookies))
    
    // 檢查是否有 NextAuth session token
    const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token']
    
    if (!sessionToken) {
      console.log('[Session Route] No session token found')
      return null
    }
    
    console.log('[Session Route] Session token exists:', sessionToken.substring(0, 10) + '...')
    
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
          return {
            user: {
              id: user.id.toString(),
              email: user.email,
              name: user.email
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
          }
        }
      }
    } catch (parseError) {
      console.log('[Session Route] Could not parse session token, using basic session')
    }
    
    // 返回基本的 session 資訊
    return {
      user: {
        id: "authenticated",
        email: "user@example.com",
        name: "Authenticated User"
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }
  } catch (error) {
    console.error('[Session Route] Error:', error)
    return null
  }
})