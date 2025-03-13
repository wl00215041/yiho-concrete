<template>
  <div class="main">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import 'vue3-carousel/carousel.css';
  import VueDragScroller from  "vue-drag-scroller"
  const nuxtApp = useNuxtApp()
  nuxtApp.vueApp.use(VueDragScroller)
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";

.main {
  padding: 1.25rem 2.8125rem 0rem 2.8125rem;
  // @apply max-w-screen-2xl
}

</style>