<template>
  <div class="flex items-center h-[25rem] relative bg rounded-[1.875rem] mb-20" :style="{ backgroundImage: `url(${image})` }">
    <!-- <img src="/images/5.jpeg" alt="section-two-bg" class="h-full w-full rounded-2xl" /> -->
    <div
      class="relative ml-16 w-[220px] h-[220px] inline-flex flex-col justify-center items-center bg-white bg-opacity-90">
      <h2 class="text-2xl mb-4" :style="{ color: subTitleColor }">{{ subTitle }}</h2>
      <h1 class="text-4xl" :class="titleClass">{{ title }}</h1>
      <SvgoSquareDottedTexture
        class="absolute translate-x-[calc(100%+72px/4)] translate-y-[calc(100%+72px/3)] text-[4.5rem]"
        :style="{ color: subTitleColor }"></SvgoSquareDottedTexture>
    </div>
    <div class="absolute right-16 bottom-[-131px]">
      <SvgoCircle class="text-[13.75rem] !mb-0" :style="{ color: subTitleColor }" filled></SvgoCircle>
      <SvgoDottedTexture class="absolute -left-1/3 -bottom-1/3 rotate-90 text-[146px]" filled></SvgoDottedTexture>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  titleClass: {
    type: String || Object,
  },
  subTitle: {
    type: String,
    required: true,
  },
  subTitleColor: {
    type: String,
  }
})

</script>
<style lang="scss" scoped>
.bg {
  background-size: cover;
  background-position: 0px -180px;
  background-repeat: no-repeat;
}
</style>