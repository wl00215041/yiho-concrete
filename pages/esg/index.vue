<template>
  <div>
    <PageBanner image="/images/product-banner.png" title="環境永續" sub-title="Sustainability" sub-title-color="#0075C2">
    </PageBanner>
    <PageSection title="產品碳足跡" icon-color="#0075C2">
      <div class="relative flex flex-col justify-center items-center mb-[60px]">
        <img src="/images/carbon-footprint-bg.svg" alt="carbon-footprint"
          class="w-full pad:max-w-[624px] -my-24 desktop:max-w-[793px] object-cover rounded-[20px] mb-[20px]">
      </div>
      <div class="flex justify-center gap-16">
        <EsgStepper />
        <div>
          <div class="flex-1">
            <div class="w-[446px] text-white text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]">碳足跡認證標準</div>
            <ul class="list-disc">
              <li v-for="certification in esgStandard"
                class="flex justify-between px-[30px] items-center py-[22px] border-b border-dashed border-[#0075C2]">
                <span>{{ certification.name }}</span>
                <a v-if="certification.file" :href="`/files/certifications/${certification.file}`" target="_blank">
                  <SvgoDocument filled></SvgoDocument>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageSection>
  </div>
</template>
<script setup lang="ts">
const { $trpcClient } = useNuxtApp()
const route = useRoute()

definePageMeta({
  layout: 'page'
})

interface TechniqueItem {
  name: string;
  value: string;
}

const { data: esgStandard } = await $trpcClient.getEsgDocuments.useQuery()


</script>