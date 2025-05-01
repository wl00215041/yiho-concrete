<template>
  <div>
    <div class="flex items-center h-[25rem] relative bg desktop:rounded-[1.875rem] mb-6 pad:mb-20 desktop:mx-[45px]"
      :style="{ backgroundImage: `url(${image})` }" :class="bannerClass">
      <!-- <img src="/images/5.jpeg" alt="section-two-bg" class="h-full w-full rounded-2xl" /> -->
      <div
        class="hidden relative ml-16 w-[220px] h-[220px] pad:inline-flex flex-col justify-center items-center bg-white bg-opacity-90">
        <h2 class="text-2xl mb-4 font-NTR" :style="{ color: subTitleColor }">{{ subTitle }}</h2>
        <h1 class="text-4xl" :class="titleClass">{{ title }}</h1>
        <SvgoSquareDottedTexture
          class="absolute translate-x-[calc(100%+72px/4)] translate-y-[calc(100%+72px/3)] text-[4.5rem]"
          :style="{ color: subTitleColor }"></SvgoSquareDottedTexture>
      </div>
      <div class="absolute right-6 pad:right-[30px] desktop:right-16 right:0 bottom-0 translate-y-1/2">
        <SvgoCircle class="text-[118px] pad:text-[172px] desktop:text-[13.75rem] !mb-0 transition-all"
          :style="{ color: subTitleColor }" filled></SvgoCircle>
        <SvgoDottedTexture
          class="absolute -left-[55%] -bottom-[75%] pad:-left-1/3 pad:-bottom-1/3 desktop:-left-1/3 desktop:-bottom-1/3 rotate-90 text-[146px]"
          filled></SvgoDottedTexture>
      </div>
    </div>

    <div
      class="relative pad:hidden pl-6 flex flex-col  pb-6 mb-8 border-b border-b-[#D9D9D9]">
      <h2 class="text-xl mb-4" :style="{ color: subTitleColor }">{{ subTitle }}</h2>
      <h1 class="text-2xl" :class="titleClass">{{ title }}</h1>
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
  },
  bannerClass: {
    type: String,
  },
})

</script>
<style lang="scss" scoped>
.bg {
  background-size: cover;
  // background-position: 0px -180px;
  background-repeat: no-repeat;
}
</style>