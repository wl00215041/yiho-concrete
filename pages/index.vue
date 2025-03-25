<template>
  <div>
    <HomeHeader></HomeHeader>
    <div class="carousel relative">
      <HomeSlogan class="slogan-placement"></HomeSlogan>
      <HomeCarousel></HomeCarousel>
      <HomeAnnouncement></HomeAnnouncement>
    </div> 
    <HomeAchievementSection class="mb-8"></HomeAchievementSection>
    <HomeAboutSection></HomeAboutSection>
    <HomeProductSection></HomeProductSection>
    {{ data }}
  </div>
</template>
<script setup lang="ts">
const { $trpcClient } = useNuxtApp()

const { data, execute, refresh } = await $trpcClient.userList.useQuery()
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


.slogan-placement {
  @apply absolute pad:top-36 desktop:top-auto desktop:bottom-32 left-10;
}








</style>