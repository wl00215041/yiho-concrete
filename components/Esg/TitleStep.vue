<template>
  <div class="flex flex-col items-center w-full" :style="{ '--bg-color': color }">
    <div class="title after:hidden pad:after:inline-block relative h-16 mb-6 leading-[64px] text-3xl font-bold text-white text-center w-full bg-[var(--bg-color)]" :class="{ 'with-arrow': showArrow }">
      減少污染</div>
    <div class="max-w-[320px]">
      毅和以減少空氣污染，率續更換六期排放標準的混凝土車，六期排放標準對柴油車的氮氧化物、懸浮微粒等污染物排放有更嚴格的限制，在污染排放方面更為環保。
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
  left: 100%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 32px 0 32px 30px;
  border-color: transparent transparent transparent (var(--bg-color));
  z-index: 20;
}
</style>