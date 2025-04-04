<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center flex-1">
      <img :src="imageUrl" class="mb-6 rounded-[10px] w-full max-h-[350px] object-cover">
      <button class="py-3 bg-[#0075C2] text-xl rounded-[30px] text-center text-white w-[250px] ">
        <SvgoPhone filled class="text-[22px] inline-block mr-2"></SvgoPhone>
        <span>聯繫業務窗口</span>
      </button>
    </div>

  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String
})
</script>