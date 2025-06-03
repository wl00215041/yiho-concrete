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
useHead({
  meta: [
    { name: 'description', content: '毅和, 毅和實業, 毅和預拌混凝土, 預拌混凝土, 混凝土供應商, 混凝土廠商, 混凝土公司, 混凝土價格, 混凝土施工, 混凝土品質保證, 新竹預拌混凝土' },
    { name: 'keywords', content: '毅和, 毅和實業, 毅和預拌混凝土, 預拌混凝土, 混凝土供應商, 混凝土廠商, 混凝土公司, 混凝土價格, 混凝土施工, 混凝土品質保證, 新竹預拌混凝土' }
  ]
})

</script>

<style lang="scss" scoped>

.slogan-placement {
  @apply absolute pad:top-[170px] desktop:top-auto desktop:bottom-32 left-[84px];
}


:deep(section.carousel) {
  @apply mb-6 pad:pl-[2.8125rem];
}





</style>