<template>
  <section class="section relative z-50">
    <SvgoHomeProductLeftCorner class="text-[100px] absolute left-0 top-0" filled></SvgoHomeProductLeftCorner>
    <div class="section-content">
      <SectionSubtitle title="產品資訊"></SectionSubtitle>
      <div class="showcases">
        <HomeProductSectionCard @click="$router.push('/products')" title="預拌混凝土">
          <template #icon>
            <SvgoConcrete class="w-[65px] pad:w-[92px]" :fontControlled="false" filled />
          </template>
        </HomeProductSectionCard>
        <HomeProductSectionCard @click="$router.push('/products#certification')" title="品質認證">
          <template #icon>
            <SvgoCertification class="w-[50px] pad:w-[70px]" :fontControlled="false" filled />
          </template>
        </HomeProductSectionCard>
        <HomeProductSectionCard title="產品碳足跡">
          <template #icon>
            <SvgoCo2FootPrint class="w-[37px] pad:w-[52px]" :fontControlled="false" filled />
          </template>
        </HomeProductSectionCard>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section {
  @apply rounded-t-[3.75rem] rounded-br-[3.75rem] bg-white px-[2.8125rem] py-[5rem];
}

.showcases {
  @apply grid grid-cols-1 pad:grid-cols-2 desktop:grid-cols-3 gap-6;
}
</style>