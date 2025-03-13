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
  margin-bottom: 1.875rem;

  display: inline-flex;
  align-items: center;
  > span {
    margin-right: 8px;
    font-size: 1.875rem;
  }

  > .icon {
    width: 2.75rem;
    height: 2.75rem;
  }
}

</style>