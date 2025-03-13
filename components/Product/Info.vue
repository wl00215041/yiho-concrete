<template>
  <div class="flex ">
    <img :src="image" class="aspect-square object-cover w-[180px]" alt="product">
    <div class="pl-6 pt-4 ">
      <div class="text-2xl font-bold text-[#333333]">{{ title }}</div>
      <div class="text-lg text-[#585858]"><slot></slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  image: String
})
</script>