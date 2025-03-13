<template>
  <div class="pl-12 py-6 bg-[#E8382F] bg-opacity-10 text-[#333333] leading-[30px]">
    <div>基地位置： {{ location }}</div>
    <div>使用產品： {{ product }}</div>
    <div>完工日期： {{ finishedDate }}</div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  location: String,
  product: String,
  finishedDate: String
})

</script>