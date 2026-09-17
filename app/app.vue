<template>
  <div class="main">
    <!-- 換頁時的頂端進度條：點擊後超過 0.2 秒還沒換頁才顯示（快速換頁不閃爍），品牌色藍 → 紅漸層 -->
    <NuxtLoadingIndicator
      color="linear-gradient(90deg, #0075C2 0%, #3C8FD9 45%, #E8382F 100%)"
      error-color="#E8382F"
      :height="3"
      :throttle="200"
      :duration="2500"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import 'vue3-carousel/carousel.css';

  // 每頁預設的 canonical / og:url 指向自己，頁面用 SeoHead 指定 url 時會覆蓋
  const route = useRoute()
  const canonicalUrl = computed(() => `https://yiho-concrete.com.tw${route.path.replace(/\/$/, '')}`)
  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [{ property: 'og:url', content: canonicalUrl }]
  })
</script>

<style>
/*
 * 換頁轉場（頁面與 layout 轉場共用，名稱都是 page，mode: out-in）
 * - 離開：舊頁面快速淡出並微微上移，點擊後立刻有回應
 * - 進入：新頁面由下方上浮並淡入，ease-out 快進慢停；與離開同方向，有「往上翻到下一頁」的連續感
 * 只動 opacity / transform（GPU 合成）。不要對整頁用 filter: blur，會掉幀。
 * 捲軸在離開完成的那一刻回到頂端，見 router.options.ts。
 */
.page-leave-active {
  transition: opacity 0.16s cubic-bezier(0.4, 0, 1, 1), transform 0.16s cubic-bezier(0.4, 0, 1, 1);
}
.page-enter-active {
  transition: opacity 0.36s cubic-bezier(0.22, 1, 0.36, 1), transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(1.25rem);
}

/* 進度條下緣的柔光，讓 3px 的細線在白色 header 上也看得清楚 */
.nuxt-loading-indicator {
  box-shadow: 0 1px 6px rgba(0, 117, 194, 0.45);
}

/* 使用者在系統設定了「減少動態效果」：只保留極短的淡入淡出，不位移 */
@media (prefers-reduced-motion: reduce) {
  .page-leave-active,
  .page-enter-active {
    transition: opacity 0.1s linear;
  }
  .page-leave-to,
  .page-enter-from {
    transform: none;
  }
}
</style>

<style lang="scss">
@use "~/assets/scss/main.scss";

.main {
  // padding: 1.25rem 2.8125rem 0rem 2.8125rem;
  // @apply max-w-screen-2xl
  // @apply py-4
}

</style>