<template>
  <div class="relative border border-transparent inline-block w-[233px] bg-[#E2E8F0] rounded-[5px]" :class="{ checked }">
    <input type="checkbox" v-model="checked" class="absolute top-2 left-2 w-4 h-4 rounded-[3px]" />
    <img src="/images/1.jpeg" class="object-cover w-full h-[127px] mb-4 cursor-pointer rounded-t-[5px]" @click="checked=!checked" alt="Image">
    <div class="flex items-center justify-between w-full px-4 mb-4">
      <span class="truncate max-w-[ㄉㄢ0px] overflow-hidden text-[#64748B]">{{ title }}</span>
      <SvgoEdit class="w-6 h-6 flex-shrink-0 cursor-pointer" filled />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
})

const checked = defineModel('checked')

</script>
<style lang="scss" scoped>
.checked {
  @apply border border-[#0075C2];
}
</style>