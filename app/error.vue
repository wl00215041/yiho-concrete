<template>
  <div>
    <!-- 確保 SEO 標題不會顯示 500 錯誤 -->
    <SeoHead
      title="頁面未找到"
      description="毅和實業 - 預拌混凝土專家。您訪問的頁面不存在，請返回首頁瀏覽我們的服務。"
      :noIndex="true"
    />
    
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <NuxtLink to="/" class="inline-block">
            <img src="/images/about.png" alt="毅和實業" class="mx-auto h-12 w-auto">
          </NuxtLink>
          
          <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
            頁面未找到
          </h2>
          
          <p class="mt-2 text-center text-sm text-gray-600">
            您訪問的頁面不存在或已被移除
          </p>
        </div>

        <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="space-y-4">
            <NuxtLink 
              to="/" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              返回首頁
            </NuxtLink>
            
            <div class="text-center">
              <p class="text-sm text-gray-500">或瀏覽我們的服務</p>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-sm">
              <NuxtLink to="/about" class="text-blue-600 hover:text-blue-500 text-center">關於我們</NuxtLink>
              <NuxtLink to="/products" class="text-blue-600 hover:text-blue-500 text-center">產品服務</NuxtLink>
              <NuxtLink to="/achievements" class="text-blue-600 hover:text-blue-500 text-center">工程實績</NuxtLink>
              <NuxtLink to="/location" class="text-blue-600 hover:text-blue-500 text-center">據點資訊</NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center text-sm text-gray-500">
          <p>毅和實業股份有限公司</p>
          <p>預拌混凝土專家 | 電話: 037-470212</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 獲取錯誤信息
const error = useError()

// 強制設置正確的頁面標題，避免 500 錯誤出現在標題中
useHead({
  title: '毅和實業 - 預拌混凝土專家',
  titleTemplate: '%s'
})

// 對於安全掃描請求，不記錄錯誤避免日誌污染
if (process.server && error.value) {
  const suspiciousPaths = [
    '/config.js', '/config.jsp', '/cloud/', '/login', 
    '/_nuxt/', '/apple-touch-icon', '/achievements/public/public'
  ]
  
  const path = error.value.url || ''
  const isScan = suspiciousPaths.some(p => path.includes(p))
  
  if (isScan) {
    console.log(`[Security] Blocked scan attempt: ${path}`)
  }
}
</script>