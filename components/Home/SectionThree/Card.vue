<template>
  <div class="card flex-1 min-w-80">
    <div class="hover-background"></div>
    <SvgoArrowRight class="absolute right-[calc(14.0625rem/2+1.875rem+1.875rem/2)] text-3xl text-[#777777]"></SvgoArrowRight>
    <div class="relative"><slot name="title" :title="title">{{ title }}</slot></div>
    <div class="relative" v-if="$slots.icon"><slot name="icon"></slot></div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
});

</script>
<style lang="scss" scoped>
.card {
  @apply flex items-center h-[135px] bg-[#D9D9D9] justify-between cursor-pointer px-5 rounded-2xl relative overflow-hidden;
  @apply text-2xl text-[#333333];

  &:hover {
    .hover-background {
      @apply translate-x-0 rounded-none;
    }
  }
}


.hover-background {
  @apply flex absolute transition-all left-0 items-center bg-[#ECECEC] rounded-l-full h-[14.0625rem] w-full translate-x-[70%];
  // @apply transition-all absolute content-[''] right-0 w-[14.0625rem] h-[14.0625rem] bg-[#ECECEC] rounded-[50%]  translate-x-1/4;
  
}
</style>