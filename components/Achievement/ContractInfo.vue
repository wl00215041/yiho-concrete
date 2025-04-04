<template>
  <div class="relative pl-12 py-6 bg-[#E8382F] bg-opacity-10 text-[#333333] leading-[30px]">
    <div>基地位置： {{ location }}</div>
    <div v-if="product">使用產品： {{ product }}</div>
    <div>完工日期： {{ finishedDate }}</div>
    <SvgoAchievementInfoIcon filled class="text-[116px] !h-[60px] pad:text-[186px] pad:!h-[96px] pad:translate-x-1/3 !mb-0 translate-y-[28px] absolute right-0 bottom-0 z-10"></SvgoAchievementInfoIcon>
  </div>
</template>

<script setup lang="ts">

defineProps({
  location: String,
  product: String,
  finishedDate: String
})

</script>