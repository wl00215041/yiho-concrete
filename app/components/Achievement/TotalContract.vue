<template>
  <div class="py-[10px] w-full text-center text-2xl font-bold bg-[#D9D9D9] rounded-2xl mb-6">
    年度總承包 <span class="text-[#E8382F]">{{ total }}</span> 件
  </div>
</template>

<script setup lang="ts">
defineProps({
  total: Number,
  default: () => 0
})
</script>