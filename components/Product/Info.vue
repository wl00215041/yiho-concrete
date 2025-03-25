<template>
  <div class="flex cursor-pointer">
    <img :src="image" class="object-cover w-[180px] h-[180px]" alt="product">
    <div class="pl-6 pad:pt-4">
      <div class="text-lg desktop:text-2xl font-bold text-[#333333] mb-2">{{ title }}</div>
      <div class="text-base text-[#585858] desktop:text-lg max-w-[90%] pad:w-[240px] desktop:w-[330px]"><slot></slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  image: String
})
</script>