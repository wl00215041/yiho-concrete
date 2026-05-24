<template>
  <div class="header">
    <div class="logo-container" :class="{ 'is-scroll-top': arrivedState.top }">
      <svgo-logo class="logo relative" filled />
      <svgo-logo-corner class="corner hidden !w-[180px] !h-[100px] left-[45px] absolute -bottom-[75px] z-[-1]"
        filled></svgo-logo-corner>
    </div>
    <navbar class="navbar"></navbar>
  </div>
</template>
<script setup lang="ts">
import useApp from '~/hooks/useApp';

const { arrivedState } = useWindowScroll();
const { breakpoint } = useApp()

</script>
<style lang="scss" scoped>
.header {
  // @apply flex justify-end items-center;
  @apply sticky top-0 z-[999] px-7 lg:pl-0 flex justify-between items-center h-20 bg-white;
}

.logo-container {
  @apply bg-white lg:pl-7 lg:rounded-br-[1.875rem] relative transition-all;
}

.logo {
  @apply w-[4.375rem] h-[3.125rem]  transition-all;
  // height: 7.9375rem;
}


.is-scroll-top {
  @apply pl-0 lg:pl-[30px] lg:mt-10;

  .logo {
    @apply lg:w-[7.5rem] lg:h-[5.3125rem];
  }

  .corner {
    @apply lg:block;
  }
}
</style>