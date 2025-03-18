<template>
  <section class="section relative z-50">
    <div class="section-content">
      <SectionSubtitle title="產品資訊"></SectionSubtitle>
      <div class="showcases" v-motion-fade-visible>
        <HomeSectionThreeCard title="預拌混凝土">
          <template #icon>
            <SvgoConcrete class="!w-[92px] !h-[70px]" filled />
          </template>
        </HomeSectionThreeCard>
        <HomeSectionThreeCard title="品質認證">
          <template #icon>
            <SvgoCertification class="!w-[70px] !h-[70px] mr-6" filled />
          </template>
        </HomeSectionThreeCard>
        <HomeSectionThreeCard title="產品碳足跡">
          <template #icon>
            <SvgoCo2FootPrint class="!w-[52px] !h-[70px] mr-7" filled />
          </template>
        </HomeSectionThreeCard>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section {
  @apply rounded-t-[3.75rem] rounded-br-[3.75rem] bg-white px-[2.8125rem] py-[5rem];
}

.showcases {
  @apply flex grid-cols-3 gap-6 flex-wrap;
}
</style>