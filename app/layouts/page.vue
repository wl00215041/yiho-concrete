<template>
  <div>
    <PageHeader />
    <div :class="{ 'mb-12': route.path !== '/esg' }">
      <slot />
    </div>
    <AppFooter class="" />
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
</script>