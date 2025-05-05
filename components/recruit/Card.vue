<template>
  <div class="flex flex-row pad:flex-col pad:justify-center items-center gap-4 mb-4 pad:mb-0">
    <div class="w-[100px] h-[100px] pad:w-[179px] pad:h-[179px] p-2 rounded-full bg-[#BABABA] bg-opacity-20">
      <div class="flex flex-col gap-1 justify-center items-center w-full h-full rounded-full border border-[#BABABA] border-opacity-50">
        <slot name="icon"></slot>
        <div class="text-xl font-bold hidden pad:block">{{ title }}</div>
      </div>
    </div>
    <div class="w-[235px] pad:text-center text-[#585858]">
      <div class="text-xl font-bold pad:hidden mb-2">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>