<template>
  <div class="flex flex-col justify-between">
    <img class="mb-2 desktop:mb-6 rounded-[10px]" :src="image" alt="acheiments">
    <div class="flex items-center gap-3 cursor-pointer">
      <SvgoArrowRight class="text-2xl desktop:text-[2rem] !mb-0 text-[#777777]"></SvgoArrowRight>
      <span class="text-base desktop:text-2xl text-[#333333]">{{ title }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  title: String,
  image: String
})

</script>