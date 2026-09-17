<template>
  <nav class="navbar">
    <button class="menu-toggle" @click="isOpen = !isOpen">
      <SvgoClose v-if="isOpen" filled class="!w-[40px] !h-[30px]"></SvgoClose>
      <SvgoToggler v-else filled class="!w-[40px] !h-[30px]"></SvgoToggler>
    </button>
    <div class="nav-links" :class="{ open: isOpen }">
      <NuxtLink class="nav-link flex items-center justify-between" to="/about">
        <span>關於我們</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <NuxtLink class="nav-link flex items-center justify-between" to="/location">
        <span>營業據點</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <NuxtLink class="nav-link flex items-center justify-between" to="/achievements">
        <span>工程實績</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <NuxtLink class="nav-link flex items-center justify-between" to="/products">
        <span>產品資訊</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <NuxtLink class="nav-link flex items-center justify-between" to="/recruit">
        <span>精英招募</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <NuxtLink class="nav-link flex items-center justify-between" to="/esg">
        <span>環境永續</span>
        <SvgoLinkIcon filled class="text-base desktop:hidden"></SvgoLinkIcon>
      </NuxtLink>
      <div class="socials">
        <a href="https://www.facebook.com/p/%E6%AF%85%E5%92%8C%E5%AF%A6%E6%A5%AD-%E9%A0%90%E6%8B%8C%E6%B7%B7%E5%87%9D%E5%9C%9F%E5%B0%88%E5%AE%B6-100063971286601/?locale=zh_TW" target="_blank">
          <svgo-social-facebook class="social-icon" filled></svgo-social-facebook>
        </a>
        <a href="https://line.me/ti/p/~@743uvgzm" target="_blank">
          <svgo-social-line class="social-icon" filled></svgo-social-line>
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    if (isOpen.value) {
      isOpen.value = false;
    }
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>
.navbar {
  // 手機／平板時不可設為 relative：.nav-links 要以外層的 sticky header 為定位基準
  @apply desktop:relative flex justify-between items-center;
}

.menu-toggle {
  @apply z-50 cursor-pointer desktop:hidden;
}

.nav-links {
  // 展開的選單貼齊所屬 header 的下緣（top-full），高度為視窗高度扣掉 header 高度（100% = header 高度）。
  // 不要寫死 px：首頁 header 是 80px、內頁 PageHeader 是 93px／109px，寫死會在較矮的 header 下方露出縫隙
  @apply absolute desktop:relative top-full desktop:top-0 left-0 right-0 lg:left-auto;
  @apply h-[calc(100dvh-100%)] desktop:h-auto overflow-y-auto desktop:overflow-visible;
  @apply flex desktop:gap-8 lg:inline-flex flex-col desktop:flex-row lg:w-[18.75rem] desktop:w-auto;
  @apply opacity-0 desktop:opacity-100 pointer-events-none desktop:pointer-events-auto bg-[#333333] desktop:bg-transparent bg-opacity-90 z-40;
  @apply transition-all duration-300 ease-in-out;
}

.nav-links.open {
  @apply opacity-100 pointer-events-auto;
}

:deep(.nav-link) {
  @apply p-6 text-white desktop:text-[#333333] border-b border-b-white border-opacity-50 text-xl desktop:text-base font-medium desktop:p-0;
}

.socials {
  @apply flex gap-6 p-6 mt-4 justify-center desktop:mt-0 desktop:p-0;
}

.social-icon {
  @apply w-[3.125rem] h-[3.125rem] cursor-pointer text-white;
}
</style>