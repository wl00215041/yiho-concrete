// 處理 /providers 請求，返回可用的認證提供者
export default defineEventHandler(async (event) => {
  console.log('[Providers Route] /providers request')
  
  return {
    credentials: {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      signinUrl: "/k-manager/signin",
      callbackUrl: "/k-manager/signin"
    }
  }
})