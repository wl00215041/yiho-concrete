<template>
  <div class="section-content-subtitle" >
    <slot name="title"><span>{{ title }}</span></slot>
    <svgo-arrow-right class="icon" filled></svgo-arrow-right>
  </div>
</template>
<script setup lang="ts">

defineProps({
  title: String,
})

</script>
<style lang="scss" scoped>
.section-content-subtitle {
  @apply mb-8 pad:mb-16 inline-flex items-center;

  > span {
    @apply mr-4 text-2xl pad:text-3xl desktop:text-4xl;
  }

  > .icon {
    @apply w-8 h-8 pad:w-11 pad:h-11;
  }
}

</style>