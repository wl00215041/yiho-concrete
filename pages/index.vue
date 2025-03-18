<template>
  <div>
    <HomeHeader></HomeHeader>
    <div class="carousel relative">
      <HomeSlogon class="slogon-placement"></HomeSlogon>
      <HomeCarousel></HomeCarousel>
      <HomeAnnouncement></HomeAnnouncement>
    </div> 
    <HomeSectionOne class="mb-8"></HomeSectionOne>
    <HomeSectionTwo class="mb-8"></HomeSectionTwo>
    <HomeSectionThree></HomeSectionThree>
  </div>
</template>
<script setup lang="ts">


</script>

<style lang="scss" scoped>
.logo-container {

  // @apply absolute z-10 left-11 top-7;
  // @apply pb-6 pr-6 rounded-br-[30px];
  // @apply bg-white;
}

.carousel {
  // margin-top: 2.1875rem;
  // @apply relative -mr-5 mb-[6.25rem];
  // &::before {
  //   content: '';
  //   @apply absolute top-[3.75rem] z-10 w-[3.75rem] h-[3.75rem] rounded-full rotate-180;
  //   @apply bg-transparent;
  //   box-shadow: 30px 30px 0 0 #fff;
  // }
}


.slogon-placement {
  @apply absolute top-36 left-10;
}








</style>