<template>
  <div class="wrapper" :class="{ 'selected': selected }">
    <div class="absolute flex justify-center gap-2 items-center top-0 left-0 w-full h-full bg-[#0075C2] bg-opacity-70 transition-all" :class="{ 'opacity-100': selected, 'opacity-0': !selected }">
      <SvgoChecked filled class="text-base"></SvgoChecked>
      <span class="text-white text-sm">設為封面</span>
    </div>
    <img :src="src" class="w-[123px] h-[84px] object-cover" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  src: String || null,
  selected: Boolean,
})

</script>

<style lang="scss" scoped>
.wrapper {
  @apply relative cursor-pointer;
  &:hover {
    
  }
}
.selected {

}

</style>