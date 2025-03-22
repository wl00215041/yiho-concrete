<template>
  <div class="text-center">
    <img :src="imageUrl" class="aspect-video mb-6 rounded-[10px]">
    <button class="py-3 bg-[#0075C2] text-xl rounded-[30px] text-center text-white w-[250px] ">
      <SvgoPhone filled class="text-[22px] inline-block mr-2"></SvgoPhone>
      <span>聯繫業務窗口</span>
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String
})
</script>