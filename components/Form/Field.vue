<template>
  <div class="flex flex-col gap-4 mb-6">
    <label class="text-[#1C2434] font-medium mb-[10px]" :for="forId">{{ title }}<Required v-if="required"></Required></label>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  required: Boolean,
  forId: String,
})
</script>