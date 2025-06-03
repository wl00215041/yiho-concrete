<template>
  <div class="flex flex-col items-center w-full" :style="{ '--bg-color': color }">
    <div class="title relative h-16 mb-6 leading-[64px] text-3xl font-bold text-white text-center w-full bg-[var(--bg-color)]" :class="{ 'with-arrow': showArrow }">
      {{ title }}</div>
    <div class="max-w-[320px]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  showArrow: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#0075C2'
  }
})
</script>
<style scoped lang="scss">
.title.with-arrow::after {
  content: '';
  position: absolute;
  left: calc(100%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 32px 0 32px 30px;
  border-color: transparent transparent transparent (var(--bg-color));
  z-index: 20;
}
</style>