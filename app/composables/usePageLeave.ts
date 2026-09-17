// 「舊頁面已經離開畫面」的訊號（只在瀏覽器端使用）。
// 由頁面／layout 轉場的 onAfterLeave 發出（見 middleware/route.global.ts），
// router.options.ts 的 scrollBehavior 等到這個訊號才把捲軸移回頂端。
const listeners = new Set<() => void>()

export const notifyPageLeft = () => {
  const pending = [...listeners]
  listeners.clear()
  pending.forEach(listener => listener())
}

export const oncePageLeft = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
