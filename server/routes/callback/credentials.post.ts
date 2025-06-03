import prisma from "~/server/prisma";

// 處理 credentials 登入回調
export default defineEventHandler(async (event) => {
  console.log('[Credentials Callback] POST /callback/credentials')
  
  try {
    const body = await readBody(event)
    console.log('[Credentials Callback] Body:', body)
    
    const { username, password } = body
    
    if (!username || !password) {
      console.log('[Credentials Callback] Missing credentials')
      return {
        error: "CredentialsSignin",
        status: 401,
        message: "Missing credentials"
      }
    }
    
    // 驗證用戶
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      }
    })
    
    if (!user) {
      console.log('[Credentials Callback] User not found')
      return {
        error: "CredentialsSignin",
        status: 401,
        message: "Invalid credentials"
      }
    }
    
    // 這裡應該驗證密碼，但我們假設 verifyPassword 函數存在
    const isValidPassword = await verifyPassword(user.password, password)
    
    if (!isValidPassword) {
      console.log('[Credentials Callback] Invalid password')
      return {
        error: "CredentialsSignin",
        status: 401,
        message: "Invalid credentials"
      }
    }
    
    console.log('[Credentials Callback] Login successful')
    
    // 設置 session cookie
    const sessionToken = Buffer.from(Date.now().toString() + user.id.toString()).toString('base64')
    
    setCookie(event, 'next-auth.session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    
    // 返回成功響應 - 使用完整 URL
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://yiho-concrete.com.tw' : 'http://localhost:3500'
    const redirectUrl = body.callbackUrl || '/k-manager/news'
    
    return {
      url: redirectUrl.startsWith('http') ? redirectUrl : `${baseUrl}${redirectUrl}`,
      ok: true
    }
    
  } catch (error) {
    console.error('[Credentials Callback] Error:', error)
    return {
      error: "CredentialsSignin",
      status: 500,
      message: "Internal server error"
    }
  }
})