export default defineNuxtRouteMiddleware((to, from) => {
  // 只對 k-manager 路由進行認證檢查
  if (!to.path.startsWith('/k-manager/')) {
    return
  }
  
  // 排除不需要認證的頁面
  const publicPages = ['/k-manager/signin', '/k-manager/signout', '/k-manager/register']
  if (publicPages.includes(to.path)) {
    console.log('[Manager Auth] Public page, skipping auth check:', to.path)
    return
  }
  
  const { status, data: session } = useAuth()
  
  console.log('[Manager Auth] Route:', to.path)
  console.log('[Manager Auth] Status:', status.value)
  console.log('[Manager Auth] Session:', !!session.value)
  console.log('[Manager Auth] Process:', process.server ? 'server' : 'client')
  
  // 如果沒有認證，重定向到自定義登入頁面
  if (status.value === 'unauthenticated') {
    console.log('[Manager Auth] Redirecting to signin - unauthenticated')
    return navigateTo('/k-manager/signin')
  }
  
  // 如果認證狀態還在載入中
  if (status.value === 'loading') {
    if (process.server) {
      // 在服務端，如果狀態為 loading，重定向到登入頁面
      console.log('[Manager Auth] Redirecting to signin - loading on server')
      return navigateTo('/k-manager/signin')
    } else {
      // 在客戶端，等待認證狀態確定
      console.log('[Manager Auth] Auth status loading on client, waiting...')
      return
    }
  }
  
  // 如果已認證，允許訪問
  if (status.value === 'authenticated') {
    console.log('[Manager Auth] User authenticated, allowing access to:', to.path)
    return
  }
})