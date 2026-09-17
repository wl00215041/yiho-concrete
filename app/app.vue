<template>
  <div class="main">
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
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
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