// 處理登出請求
export default defineEventHandler(async (event) => {
  console.log('[Signout Route] POST /signout')
  
  try {
    // 清除 session cookie
    deleteCookie(event, 'next-auth.session-token')
    deleteCookie(event, '__Secure-next-auth.session-token')
    
    console.log('[Signout Route] Session cookies cleared')
    
    // 返回成功響應
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://yiho-concrete.com.tw' : 'http://localhost:3500'
    
    return {
      url: `${baseUrl}/k-manager/signin`,
      ok: true
    }
    
  } catch (error) {
    console.error('[Signout Route] Error:', error)
    return {
      error: "SignoutError",
      status: 500,
      message: "Internal server error"
    }
  }
})