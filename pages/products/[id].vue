<template>
  <div>
    <PageBanner image="/images/6.jpeg" title="產品資訊" sub-title="Products" sub-title-color="#0075C2"></PageBanner>
    <PageSection :title="product?.title" icon-color="#0075C2">
      <template #title="{ title }">
        <div class="flex flex-col pad:flex-row pad:items-center gap-2 pad:gap-4">
          <span>{{ title }}</span>
          <span class="text-base text-[#585858]">超越極限的承載力</span>
        </div>
      </template>
      <div class="flex flex-col gap-6 pad:gap-8 pad:flex-row mb-16">
        <ProductDetailInfo class="flex-[0.3]" image-url="/images/5.jpeg"></ProductDetailInfo>
        <div class="flex-[0.7]">
          <div class="flex flex-col gap-8 desktop:flex-row desktop:gap-11">
            <ProductDetail title="產品特性" :items="product?.features">
              <template #icon>
                <SvgoGlyph filled class="text-2xl"></SvgoGlyph>
              </template>
            </ProductDetail>
            <ProductDetail title="適用範圍" :items="product?.applications">
              <template #icon>
                <SvgoTarget filled class="text-2xl"></SvgoTarget>
              </template>
            </ProductDetail>
          </div>
          <div class="h-[1px] border border-dashed border-[#BABABA] pad:my-6"></div>
          <div>
            <ProductDetail title="技術規格" :with-padding="false">
              <template #icon>
                <SvgoCheckList filled class="text-2xl"></SvgoCheckList>
              </template>
              <ProductTechniqueSpec :items="product?.specifications"></ProductTechniqueSpec>
            </ProductDetail>
          </div>
        </div>
      </div>
      <div class="text-center">
        <BackButton></BackButton>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $trpcClient } = useNuxtApp()

const { data: product, execute, refresh } = await $trpcClient.productById.useQuery(Number(route.params.id))
// execute()

definePageMeta({
  layout: 'page'
});
</script>
