<template>
  <div>
    <div class="mb-8 text-3xl">{{ title }}</div>
    <div class="flex flex-col pad:flex-row gap-6 items-center">
      <div><slot name="icon"></slot></div>
      <div><slot></slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
})
</script>