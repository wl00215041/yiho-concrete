<template>
  <div class="flex flex-col">
    <div class="overflow-hidden rounded-[10px] pad:h-[153px] desktop:h-[260px] mb-2">
      <img class=" w-full hover:scale-125 transition-all desktop:mb-6 " :src="image" :alt="title">
    </div>
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