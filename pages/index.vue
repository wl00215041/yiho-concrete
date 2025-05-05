<template>
  <div>
    <HomeHeader></HomeHeader>
    <div class="carousel relative mb-8 pad:mb-14 desktop:mb-[76px]">
      <HomeSlogan class="slogan-placement"></HomeSlogan>
      <HomeCarousel></HomeCarousel>
      <HomeAnnouncement></HomeAnnouncement>
    </div> 
    <HomeAchievementSection class="mb-8"></HomeAchievementSection>
    <HomeAboutSection></HomeAboutSection>
    <HomeProductSection></HomeProductSection>
  </div>
</template>
<script setup lang="ts">

</script>

<style lang="scss" scoped>

.slogan-placement {
  @apply absolute pad:top-[170px] desktop:top-auto desktop:bottom-32 left-[84px];
}


:deep(section.carousel) {
  @apply mb-6 pad:pl-[2.8125rem];
}





</style>