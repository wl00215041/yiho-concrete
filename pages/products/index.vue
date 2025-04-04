<template>
  <div>
    <PageBanner image="/images/product-banner.png" title="產品資訊" sub-title="Products" sub-title-color="#0075C2"></PageBanner>
    <PageSection class="mb-[60px]" title="產品類別" icon-color="#0075C2">
      <div class="grid grid-cols-1 pad:grid-cols-2 gap-8">
        <ProductInfo :title="product.title" @click="$router.push({ name: 'products-id', params: { id: product.id }  })" :image="product.imageUrl" v-for="product in products" :key="product.id">
          <pre class="text-wrap">
{{ product.description }}
          </pre>
        </ProductInfo>
      </div>
      <div></div>
    </PageSection>
    <PageSection title="品質認證" id="certification" class="py-7 bg-[#0075C2] bg-opacity-10 pad:mx-[30px] pad:rounded-[30px] relative mb-[60px]"
      icon-color="#0075C2">
      <SvgoQualityIcon filled class="absolute !w-[100px] !h-[60px] desktop:!w-[186px] desktop:!h-[107px] right-[24px] desktop:right-[30px] top-0 z-10 -translate-y-1/2"></SvgoQualityIcon>
      <SvgoQualityIcon filled class="absolute !w-[100px] !h-[60px] desktop:!w-[186px] desktop:!h-[107px] left-[24px] desktop:left-[30px] bottom-0 z-10 translate-y-1/2 rotate-180"></SvgoQualityIcon>
      <div class="flex flex-col pad:justify-center pad:flex-row gap-6 desktop:gap-[60px] pb-10">
        <div class="w-full max-w-[446px]" v-if="displayCertifications.standard.length">
          <div class=" text-white text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]">國家標準與法規</div>
          <ul class="list-disc ">
            <li v-for="standard in displayCertifications.standard" class="flex justify-between items-center px-[30px] py-[22px] border-b border-dashed border-[#0075C2]">
              <span>{{ standard.name }}</span>
              <a v-if="standard.file" :href="`/files/certifications/${standard.file}`" target="_blank">
                <SvgoDocument filled></SvgoDocument>
              </a>
            </li>
          </ul>
        </div>
        <div class="w-full  max-w-[446px]" v-if="displayCertifications.certification.length">
          <div class="w-full text-white text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]">國際認證</div>
          <ul class="list-disc">
            <li v-for="certification in displayCertifications.certification" class="flex justify-between px-[30px] items-center py-[22px] border-b border-dashed border-[#0075C2]">
              <span>{{ certification.name }}</span>
              <a v-if="certification.file" :href="`/files/certifications/${certification.file}`" target="_blank">
                <SvgoDocument filled></SvgoDocument>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </PageSection>
    <!-- <PageSection title="炭足跡" icon-color="#0075C2">
        <div class="relative flex flex-col justify-center items-center ">
          <img src="/images/carbon-footprint-bg.svg" alt="carbon-footprint" class="w-full pad:max-w-[624px] -my-24 desktop:max-w-[793px] object-cover rounded-[20px] mb-[20px]">
          <div class="text-center font-medium absolute pad:relative flex items-center">
            <div class="text-lg pad:text-2xl pad:inline-block mr-2">本公司產品從原料開採至生產階段 (A1-A3)</div>
            <span class="text-[2.5rem]">減少 25% CO₂ 排放</span>
          </div>
        </div>
    </PageSection> -->
  </div>
</template>
<script setup lang="ts">
// const prisma = usePrismaClient()
const { $trpcClient } = useNuxtApp()
const route = useRoute()

definePageMeta({
  layout: 'page'
})

interface TechniqueItem {
  name: string;
  value: string;
}

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  applications: string[];
  specifications: TechniqueItem[];
}

// const products = ref([])

const { data: products, execute, refresh } = await $trpcClient.productList.useQuery()

const { data: certifications } = await $trpcClient.getCertifications.useQuery()

const displayCertifications = computed(() => {
  const list = {
    standard: certifications.value?.filter((certification) => certification.type === 'standard') || [],
    certification: certifications.value?.filter((certification) => certification.type === 'certification') || [],
  }
  return list 
})

onMounted(() => {
  if (route.hash) {
    const element = document.getElementById(route.hash.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
})


</script>