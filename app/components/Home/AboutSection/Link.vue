<template>
  <div class="link" @click="$router.push({ path })">
    <slot><span>{{ title }}</span></slot>
    <SvgoArrowRight class="link-icon"></SvgoArrowRight>
  </div>
</template>

<script setup lang="ts">

defineProps({
  title: String,
  path: String,
})

</script>

<style lang="scss" scoped>

.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1.25rem 1.75rem;
  font-size: 1.5rem;
  background-color: white;

  &-icon {
    color: #777777;
    width: 2rem;
    height: 2rem;
  }
}
</style>