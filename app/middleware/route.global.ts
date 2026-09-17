// @ts-expect-error Nuxt 產生的設定檔，沒有型別宣告
import { appLayoutTransition, appPageTransition } from '#build/nuxt.config.mjs'

// 在頁面轉場與 layout 轉場的「舊頁面離開完成」時發出訊號，讓 scrollBehavior 知道何時可以回到頂端。
// Nuxt 只有頁面轉場會發 page:transition:finish；換 layout（首頁 ↔ 內頁）時沒有任何 hook，所以兩種都自己掛。
export default defineNuxtRouteMiddleware((to) => {
  const onAfterLeave = () => notifyPageLeft()

  // 後台路由已在 manager-auth.global.ts 關閉頁面轉場，不要覆蓋
  if (to.meta.pageTransition !== false) {
    to.meta.pageTransition = { ...appPageTransition, onAfterLeave }
  }
  to.meta.layoutTransition = { ...appLayoutTransition, onAfterLeave }
})
