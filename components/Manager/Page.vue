<template>
  <div class="h-full">
    <div class="text-[26px] text-[#1C2434] font-bold mb-8"><slot name="title">{{ title }}</slot></div>
    <div class="h-[calc(100%-111px)] bg-white">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String
})
</script>