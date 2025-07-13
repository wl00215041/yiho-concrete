<template>
  <div>
    <SeoHead
      title="產品資訊"
      description="毅和實業專業生產各類預拌混凝土產品，通過國家標準認證與國際品質認證。提供高品質混凝土解決方案，適用於各種建築工程需求。"
      keywords="預拌混凝土產品,混凝土規格,混凝土品質認證,建築混凝土,工程混凝土,混凝土技術規格,毅和混凝土產品,混凝土應用,混凝土標準"
      url="https://yiho-concrete.com.tw/products"
      image="https://yiho-concrete.com.tw/images/product-banner.png"
    />
    
    <PageBanner image="/images/product-banner.png" title="產品資訊" sub-title="Products" sub-title-color="#0075C2">
    </PageBanner>
    <PageSection class="mb-[60px]" title="產品類別" icon-color="#0075C2">
      <div class="grid grid-cols-1 pad:grid-cols-2 gap-8">
        <ProductInfo :href="`products/${product.id}`" :title="product.title" @click.prevent="$router.push({ name: 'products-id', params: { id: product.id } })"
          :image="product.imageUrl" v-for="product in products" :key="product.id">
          <pre class="text-wrap">
{{ product.description }}
          </pre>
        </ProductInfo>
      </div>
      <div></div>
    </PageSection>
    <PageSection title="品質認證" id="certification"
      class="py-7 bg-[#0075C2] bg-opacity-10 pad:mx-[30px] pad:rounded-[30px] relative mb-[60px]" icon-color="#0075C2">
      <SvgoQualityIcon filled
        class="absolute !w-[100px] !h-[60px] desktop:!w-[186px] desktop:!h-[107px] right-[24px] desktop:right-[30px] top-0 z-10 -translate-y-1/2">
      </SvgoQualityIcon>
      <SvgoQualityIcon filled
        class="absolute !w-[100px] !h-[60px] desktop:!w-[186px] desktop:!h-[107px] left-[24px] desktop:left-[30px] bottom-0 z-10 translate-y-1/2 rotate-180">
      </SvgoQualityIcon>
      <div class="flex justify-center">
        <div
          class="flex flex-col pad:justify-center w-[calc(70%+220px)] pad:flex-row gap-[60px] desktop:gap-[60px] pb-10"
          :class="{ 'items-center': isOnlyStandard || isOnlyCertification }">
          <div class="flex-1" v-if="displayCertifications.standard.length">
            <div class=" text-white text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]">國家標準與證照</div>
            <ul class="list-disc" :class="{ 'pad:!grid pad:!grid-cols-2 pad:!gap-x-10': isOnlyStandard }">
              <li v-for="standard in displayCertifications.standard"
                class="flex justify-between items-center px-[30px] py-[22px] border-b border-dashed border-[#0075C2]">
                <span>{{ standard.name }}</span>
                <a v-if="standard.file" :href="`/files/certifications/${standard.file}`" target="_blank">
                  <SvgoDocument filled></SvgoDocument>
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-1" v-if="displayCertifications.certification.length">
            <div class="w-full text-white text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]"
              :class="{ 'items-center': isOnlyStandard || isOnlyCertification }">國際認證</div>
            <ul class="list-disc" :class="{ 'pad:!grid pad:!grid-cols-2 pad:!gap-x-10': isOnlyCertification }">
              <li v-for="certification in displayCertifications.certification"
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
const { $trpcClient } = useNuxtApp()
const route = useRoute()

definePageMeta({
  layout: 'page'
})

const { data: products, execute, refresh } = await $trpcClient.productList.useQuery()

const { data: certifications } = await $trpcClient.getCertifications.useQuery()

const displayCertifications = computed(() => {
  const list = {
    standard: certifications.value?.filter((certification) => certification.type === 'standard') || [],
    certification: certifications.value?.filter((certification) => certification.type === 'certification') || [],
  }
  return list
})


// 產品目錄結構化資料
const productStructuredData = computed(() => {
  if (!products.value) return null
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "毅和實業預拌混凝土產品",
    "description": "毅和實業專業生產各類預拌混凝土產品，通過國家標準認證與國際品質認證",
    "url": "https://yiho-concrete.com.tw/products",
    "numberOfItems": products.value.length,
    "itemListElement": products.value.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": `https://yiho-concrete.com.tw${product.imageUrl}`,
        "url": `https://yiho-concrete.com.tw/products/${product.id}`,
        "manufacturer": {
          "@type": "Organization",
          "name": "毅和實業股份有限公司"
        },
        "category": "預拌混凝土",
        "brand": {
          "@type": "Brand",
          "name": "毅和實業"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "TWD",
          "price": "0",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "0",
            "priceCurrency": "TWD",
            "valueAddedTaxIncluded": false
          },
          "description": "價格請洽詢業務專員",
          "seller": {
            "@type": "Organization",
            "name": "毅和實業股份有限公司"
          }
        }
      }
    }))
  })
})

// 認證結構化資料
const certificationStructuredData = computed(() => {
  if (!certifications.value) return null
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "毅和實業股份有限公司",
    "hasCredential": [
      ...displayCertifications.value.standard.map(cert => ({
        "@type": "EducationalOccupationalCredential",
        "name": cert.name,
        "credentialCategory": "國家標準認證",
        "recognizedBy": {
          "@type": "Organization",
          "name": "中華民國政府"
        }
      })),
      ...displayCertifications.value.certification.map(cert => ({
        "@type": "EducationalOccupationalCredential",
        "name": cert.name,
        "credentialCategory": "國際認證",
        "recognizedBy": {
          "@type": "Organization",
          "name": "國際認證機構"
        }
      }))
    ]
  })
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: productStructuredData.value
    },
    {
      type: 'application/ld+json',
      innerHTML: certificationStructuredData.value
    }
  ]
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

onMounted(() => {
  if (route.hash) {
    const element = document.getElementById(route.hash.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
})

const isOnlyStandard = computed(() => {
  return displayCertifications.value.standard.length && !displayCertifications.value.certification.length
})
const isOnlyCertification = computed(() => {
  return !displayCertifications.value.standard.length && displayCertifications.value.certification.length
})


</script>