<template>
  <div>
    <PageBanner image="/images/product-banner.png" title="產品資訊" sub-title="Products" sub-title-color="#0075C2"></PageBanner>
    <PageSection :title="product?.title" icon-color="#0075C2">
      <template #title="{ title }">
        <div class="flex flex-col pad:flex-row pad:items-center gap-2 pad:gap-4">
          <span>{{ title }}</span>
          <span class="text-base text-[#585858]">超越極限的承載力</span>
        </div>
      </template>
      <div class="flex flex-col gap-6 pad:gap-8 pad:flex-row mb-16">
        <ProductDetailInfo class="flex-[0.3]" :image-url="product?.imageUrl"></ProductDetailInfo>
        <div class="flex-[0.7]">
          <div class="flex flex-col gap-8 desktop:flex-row desktop:gap-11">
            <ProductDetail class="w-1/2" title="產品特性" :items="product?.features">
              <template #icon>
                <SvgoGlyph filled class="text-2xl"></SvgoGlyph>
              </template>
            </ProductDetail>
            <ProductDetail class="w-1/2" title="適用範圍" :items="product?.applications">
              <template #icon>
                <SvgoTarget filled class="text-2xl"></SvgoTarget>
              </template>
            </ProductDetail>
          </div>
          <template v-if="displayTechniqueSpec.length > 0">
            <div class="h-[1px] border border-dashed border-[#BABABA] pad:my-6"></div>
            <div>
              <ProductDetail title="技術規格" :with-padding="false">
                <template #icon>
                  <SvgoCheckList filled class="text-2xl"></SvgoCheckList>
                </template>
                <ProductTechniqueSpec :items="displayTechniqueSpec"></ProductTechniqueSpec>
              </ProductDetail>
            </div>
          </template>


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

const displayTechniqueSpec = computed(() => {
  return product.value?.specifications?.filter((spec) => spec.value !== '') || []
})

definePageMeta({
  layout: 'page'
});
</script>
