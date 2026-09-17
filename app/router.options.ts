import type { RouterConfig } from '@nuxt/schema'

// 換頁時「舊頁面離開之後」才把捲軸移回頂端，而不是一點連結就先跳回頂端。
//
// Nuxt 內建的 scrollBehavior 等的是 page:loading:end，它在淡出動畫「開始之前」就觸發，
// 舊頁面還在畫面上就被捲到頂端。這裡改等轉場的 onAfterLeave 訊號（見 middleware/route.global.ts）；
// 沒有轉場的導航（後台頁面之間）則等新頁面渲染完成（page:finish）。
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 同一頁：只處理 #錨點
    if (to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '')) {
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' }
      }
      return from.hash ? { left: 0, top: 0 } : false
    }

    const nuxtApp = useNuxtApp()
    const willTransition = to.meta.pageTransition !== false || to.meta.layout !== from.meta.layout

    return new Promise((resolve) => {
      const cleanups: Array<() => void> = []
      const done = () => {
        cleanups.forEach(cleanup => cleanup())
        requestAnimationFrame(() => {
          // 瀏覽器上一頁／下一頁：還原原本的捲動位置
          resolve(savedPosition || (to.hash ? { el: to.hash } : { left: 0, top: 0 }))
        })
      }

      if (willTransition) {
        cleanups.push(oncePageLeft(done))
      }
      cleanups.push(nuxtApp.hooks.hook('page:finish', () => {
        if (!willTransition) {
          return done()
        }
        // 保險：轉場若因故沒有發出訊號，新頁面就緒 1 秒後仍會捲動，不會卡住
        const timer = setTimeout(done, 1000)
        cleanups.push(() => clearTimeout(timer))
      }))
    })
  },
}
