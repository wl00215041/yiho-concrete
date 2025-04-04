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
  </div>
</template>
<script setup lang="ts">

</script>

<style lang="scss" scoped>

.slogan-placement {
  @apply absolute pad:top-[170px] desktop:top-auto desktop:bottom-32 left-[84px];
}








</style>