<template>
  <div class="h-full">
    <div class="text-[26px] text-[#1C2434] font-bold mb-8 flex items-center"><SvgoMenuToggle @click="toggleSidebar" class="mr-4 pad:hidden cursor-pointer" filled></SvgoMenuToggle><slot name="title">{{ title }}</slot></div>
    <div class="h-[calc(100%-111px)] bg-white">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const { toggleSidebar } = useSidebar()
defineProps({
  title: String
})
</script>