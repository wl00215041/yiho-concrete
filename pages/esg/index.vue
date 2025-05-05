<template>
  <div>
    <PageBanner image="/images/esg-banner.png" banner-class="bg-center" title="環境永續" sub-title="Sustainability" sub-title-color="#0075C2">
    </PageBanner>
    <PageSection class="mb-14" title="毅和淨零減碳策略起步及精進" icon-color="#0075C2">
      <div class="mb-12 max-w-[777px]">
        毅和為生產混凝土及銷售，混凝土為公共基礎建設不可或缺、不可替代且用量最大的資源，且符合國家重點六大核心中民生重要工業物資供應及完備關鍵基礎設施重要產業，近年來陸續修繕三廠，並有效發揮國內產業優勢透過智慧化落實原料品管流程及檢驗，促進產銷資訊透明公開、品質流向管理，建構優良混凝土產品履歷。
      </div>
      <div class="flex flex-col pad:flex-row justify-between gap-8">
        <EsgColumnWithTitle title="經濟循環零廢棄">
          <template #icon>
            <SvgoEsg1 filled class="w-[250px]" :fontControlled="false">
            </SvgoEsg1>
          </template>
          <div>銷貨過程產生餘料皆轉為水泥方塊銷售，可用於零售消費者圍牆建置，且因純混凝土製成無混雜廢棄物，所以品質穩定，且生產及運輸快速，必要時可用於民生及關鍵基礎設施，上述生產銷售過程再利用，打造經濟循環零廢棄。
          </div>
        </EsgColumnWithTitle>
        <EsgColumnWithTitle title="永續資源再利用">
          <template #icon>
            <SvgoEsg2 filled class="w-[250px]" :fontControlled="false">
            </SvgoEsg2>
          </template>
          <div>
            廠內清洗預拌車及拌和機及沖洗場地產生之廢棄物含有砂石水泥等膠結材料廢棄物，廠內設有沉澱池，將砂石水泥分離，分離清水及膠結材沉澱廢棄物依據比例添加至預拌混凝土製程中，促使污泥得以回收再利用，廢棄物資源再利用，為達永續資源再利用，發展循環效益。
          </div>
        </EsgColumnWithTitle>
      </div>
    </PageSection>
    <PageSection class="mb-14" title="設備更新" icon-color="#0075C2">
      <div class="flex flex-col pad:flex-row gap-5 pad:gap-0">
        <EsgTitleStep color="#80BAE0" showArrow></EsgTitleStep>
        <EsgTitleStep color="#4097D1" showArrow></EsgTitleStep>
        <EsgTitleStep color="#0075C2"></EsgTitleStep>
      </div>
    </PageSection>
    <PageSection class="bg-[#ECECEC] py-[60px] mb-14" title="規劃執行" icon-color="#0075C2">
      <div class="flex gap-8 flex-col pad:flex-row">
        <div class="flex-1 text-[#333333]">
          <p class="mb-6">毅和於 2023 年已聘雇專家協助針對廠內進行組織溫室氣體盤查,了解廠內排碳熱點,並陸續執行減碳策略</p>
          <p>毅和預計於 2025
            年與專家共同執行產品碳盤查計算含碳量,了解公司產品碳足跡,公司內部累積優化減碳工作的數據基礎，以及強化內部成員的認同感和凝聚行動共識，另一方面也是向主管單位、客戶、消費者等需求者溝通工作成效回應需求
          </p>
        </div>
        <EsgExecuteMobile></EsgExecuteMobile>
        <EsgExecutePad class="flex-[2]"></EsgExecutePad>
      </div>

    </PageSection>
    <PageSection title="產品碳足跡" icon-color="#0075C2">
      <div class="relative flex flex-col justify-center items-center mb-[60px]">
        <img src="/images/carbon-footprint-bg.svg" alt="carbon-footprint"
          class="w-full pad:max-w-[624px] pad:-mt-24 desktop:max-w-[793px] object-cover rounded-[20px] mb-[20px]">
      </div>
      <div class="flex flex-col pad:flex-row justify-center items-center pad:items-start gap-16">
        <EsgStepper />
        <div class="w-full pad:w-auto">
          <div class="flex-1">
            <div class="pad:w-[446px] text-white font-bold text-center bg-[#0075C2] text-lg rounded-[20px] py-[10px]">
              碳足跡認證標準
            </div>
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
    <PageSection 
    class="pt-[60px] h-[377px] translate-y-[56px] relative overflow-hidden" 
    titleClass="text-white"
    title="節能優化" 
    icon-color="#fff">
    <!-- 使用絕對定位的背景圖片元素，而不是背景屬性 -->
     <img src="/images/eco-system.jpeg" alt="eco-system" class="absolute rounded-t-[60px] inset-0 w-full h-full object-cover z-0 bg">
    <!-- <div 
      class="absolute rounded-t-[60px] inset-0 bg-[url(/images/eco-system.jpeg)] bg-no-repeat z-0"
      >
    </div> -->
    <!-- 內容在絕對定位的背景之上 -->
    <div class="relative z-10">
      <p class="max-w-[372px] text-white">毅和於 2025 年與專家合作，蒐集與分析能源使用數據，改善製程中能源消耗量、優化既有設備運作預計加裝感測設備等，進一步改善企業的碳排放量。</p>
    </div>
  </PageSection>
  </div>
</template>
<script setup lang="ts">
import { EsgTitleStep, SvgoArmWrestling, SvgoArrows, SvgoCo2Cloud, SvgoHeart } from '#components';


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

const bodyHeight = ref(0)
const { x, y } = useWindowScroll()

onMounted(() => {
  bodyHeight.value = document.body.scrollHeight
  console.log(bodyHeight.value)
})

const parallaxX = computed(() => {
  const value = (y.value / bodyHeight.value) * 100
  return Math.min(value, 20) // 限制最大值為20
})

const parallaxY = computed(() => {
  // 起始位置為稍微負值，確保圖片一開始就完全覆蓋元素
  const startPosition = 0;
  // 滾動時的移動範圍較小，避免過度位移
  const scrollEffect = (y.value / bodyHeight.value) * 50;
  // 最終位置限制在一個合理範圍內
  return startPosition + scrollEffect;
})

</script>