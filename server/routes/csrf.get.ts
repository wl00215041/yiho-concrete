// 處理 /csrf 請求，返回 CSRF token
export default defineEventHandler(async (event) => {
  console.log('[CSRF Route] /csrf request')
  
  // 生成一個簡單的 CSRF token
  const csrfToken = Buffer.from(Date.now().toString() + Math.random().toString()).toString('base64')
  
  return {
    csrfToken: csrfToken
  }
})