<template>
  <div ref="target">
    <SeoHead
      title="關於我們"
      description="毅和實業成立於1993年，從柑仔店精神出發的混凝土專家。設有竹南港墘廠、大厝廠及新竹寶山科園廠，三十年來專業產製預拌混凝土，承諾每一米都是我們的責任。"
      keywords="毅和實業,關於毅和,公司簡介,混凝土專家,預拌混凝土廠商,竹南港墘廠,寶山科園廠,大厝廠,混凝土供應商歷史,企業文化"
      url="https://yiho-concrete.com.tw/about"
      image="https://yiho-concrete.com.tw/images/about-banner.png"
    />
    
    <PageBanner image="/images/about-banner.png" title="關於我們" sub-title="About Us" sub-title-color="#E8382F"></PageBanner>
    <PageSection title="從柑仔店來的混凝土專家" icon-color="#E8382F">
      <div class="flex flex-col gap-6 max-w-[777px] text-[#585858] mb-14">
        <p>柑仔店是台灣早期重要的生活中心之一，在沒有便利商店的年代，人民大小生活物品的採購，都在這樣傳統小店完成。隨著時代更迭，充滿人情味的柑仔店漸漸地黯淡在台灣的大街小巷之中。</p>
        <p>毅和實業成立於1993年9月26日，本公司目前設有竹南港墘廠、大厝廠以及新竹寶山科園廠，持續以先進的設備，專業的技術，產製預拌混凝土，為客戶提供優質的服務。</p>
      </div>
      <div class="grid grid-cols-1 pad:grid-cols-3 gap-8 mb-14">
        <img src="/images/7.jpeg" alt="about-us" class="w-full rounded-[10px] pad:h-[240px] object-cover" data-aos="fade-up"/>
        <img src="/images/2.jpeg" alt="about-us" class="w-full rounded-[10px] pad:h-[240px] object-cover" data-aos="fade-up"/>
        <img src="/images/3.jpeg" alt="about-us" class="w-full rounded-[10px] pad:h-[240px] object-cover" data-aos="fade-up"/>
      </div>
      <div class="flex flex-col items-center pad:text-center self-center gap-6 max-w-[745px] text-[#585858] mb-14">
        <p>
          毅和實業的其中一位創辦人林慶波先生三十多年前也在這樣的小巷子裡，經營著柑仔店。柑仔店裏頭那銀貨兩訖之外的人情味也被創辦人帶進毅和實業的企業文化之中。我們的服務以客戶為中心，如果你有一個夢想，需要混凝土將其構築起來，請給我們一個機會為你灌溉，我們承諾每一米都是我們的責任。
        </p>
        <div>
          <p>我們的第一個十年用心摸索、理解如何產製符合客戶期待的優良混凝土。</p>
          <p>第二個十年，我們穩定自己的步伐持續成長茁壯。</p>
          <p>第三個十年，我們用過去二十年的經驗，在新竹寶山，親自設計、建造屬於混凝土的旗艦廠房。</p>
          <p>第四個十年，永續建材已成為我們產品線的主軸精神，並持續導入優質混凝土、綠建材、碳足跡等相關認證。</p>
          <p>我們持續的進步，並期許能有更加完善的能力，<br>我們承諾每一米都是我們的責任。</p>
        </div>

      </div>
    </PageSection>
    <div class="relative bg-[url(/images/8.jpeg)] bg-cover flex flex-col items-center h-[350px] rounded-t-[30px] pad:rounded-t-[60px] desktop:rounded-t-[80px] pt-12 mb-[82px]" :style="{ backgroundPositionY: `${parallaxX * 10}px` }">
      <div class="absolute top-0 bottom-0 left-0 right-0 m-auto bg-black bg-opacity-50 rounded-t-[30px] pad:rounded-t-[60px] desktop:rounded-t-[80px]" ></div>
      <div class="z-10 text-white text-2xl text-center mb-[42px] max-w-[345px] pad:max-w-none">如果你有一個夢想，需要混凝土將其構築起來，<br>請給我們一個機會，為您灌溉每一個夢想家園。</div>
      <div class="z-10 flex justify-center gap-[2.625rem]">
        <div class="inline-flex justify-center items-center p-6 pad:p-[38px] w-24 h-24 pad:w-40 pad:h-40 desktop:w-40 desktop:h-40 rounded-full bg-[#E8382F] bg-opacity-70">
          <SvgoBusinessGrowth filled class="!w-full !h-full desktop:text-[5.25rem]"></SvgoBusinessGrowth>
        </div>
        <div class="inline-flex justify-center items-center p-6 pad:p-[38px] w-24 h-24 pad:w-40 pad:h-40 desktop:w-40 desktop:h-40 rounded-full bg-[#E8382F] bg-opacity-70">
          <SvgoProtectionGrowth filled class="!w-full !h-full desktop:text-[5.25rem]"></SvgoProtectionGrowth>
        </div>
        <div class="inline-flex justify-center items-center p-6 pad:p-[38px] w-24 h-24 pad:w-40 pad:h-40 desktop:w-40 desktop:h-40 rounded-full bg-[#E8382F] bg-opacity-70">
          <SvgoEcoFriendly filled class="!w-full !h-full desktop:text-[5.25rem]"></SvgoEcoFriendly>
        </div>
      </div>
    </div>
    <Timeline class="overflow-hidden">
      <TimelineItem year="1993" title="公司草創">
        <p class="text-sm text-[#585858]">民國82年 籌備創立
          專營預拌混凝土產品</p>
      </TimelineItem>
      <TimelineItem year="1993" title="竹南港墘廠啟用">
        <p class="text-sm text-[#585858]">民國82年 廠房1.0</p>
        <p class="text-sm text-[#585858]">平單軸拌合設備一套</p>
        <p class="text-sm text-[#585858] whitespace-nowrap">工廠佔地1500坪(當年可設立於農地)</p>
      </TimelineItem>
      <TimelineItem year="1999" title="港墘廠損壞">
        <p class="text-sm text-[#585858]">民國88年  921大地震</p>
        <p class="text-sm text-[#585858] w-[280px]">廠區設備全毀停業半年，全廠重新修復，重新評估廠房合法性</p>
      </TimelineItem>
      <TimelineItem year="2001" title="竹南大厝廠啟用">
        <p class="text-sm text-[#585858]">民國91年 廠房2.0</p>
        <p class="text-sm text-[#585858] w-[280px]">標準3米半水平單軸拌合設備一套 (合法工業區佔地400坪)</p>
      </TimelineItem>
      <TimelineItem year="2005" title="新竹寶山科學廠啟用">
        <p class="text-sm text-[#585858]">民國104年 廠房3.0</p>
        <p class="text-sm text-[#585858] w-[280px]">標準3米半水平單軸拌合設備兩套(合法工業區佔地800坪)</p>
      </TimelineItem>


      <TimelineItem year="2023" title="竹南港墘廠重建">
        <p class="text-sm text-[#585858]">民國112年 創立30年</p>
        <p class="text-sm text-[#585858] w-[280px]">重新更換標準3米半水平雙軸拌合設備一套</p>
      </TimelineItem>

      <TimelineItem year="2024" title="寶山廠設備修繕">
        <p class="text-sm text-[#585858]">民國114年</p>
        <p class="text-sm text-[#585858] w-[280px]">檢修全廠設備，著手規劃倉儲設備</p>
      </TimelineItem>

      <TimelineItem year="2024" title="竹南大厝廠設備修繕">
        <p class="text-sm text-[#585858]">民國114年</p>
        <p class="text-sm text-[#585858] w-[280px]">修繕拌合設備</p>
      </TimelineItem>
      <TimelineItem year="2025" title="企業轉型">
        <p class="text-sm text-[#585858]">民國114年 廠房3.1</p>
        <p class="text-sm text-[#585858] w-[280px]">製程精進、降低損耗倉儲自動化</p>
        <p class="text-sm text-[#585858] w-[280px]">陸續申請優質混凝土標章及碳足跡認證標章，提供品質及環保雙標章認證</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'page'
})

// 公司歷史結構化資料
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "關於毅和實業",
        "description": "毅和實業成立於1993年，從柑仔店精神出發的混凝土專家。設有竹南港墘廠、大厝廠及新竹寶山科園廠，三十年來專業產製預拌混凝土。",
        "url": "https://yiho-concrete.com.tw/about",
        "mainEntity": {
          "@type": "Organization",
          "name": "毅和實業股份有限公司",
          "foundingDate": "1993-09-26",
          "founder": {
            "@type": "Person",
            "name": "林慶波"
          },
          "description": "從柑仔店精神出發的混凝土專家，承諾每一米都是我們的責任",
          "numberOfEmployees": "50-100",
          "industry": "預拌混凝土製造",
          "location": [
            {
              "@type": "Place",
              "name": "竹南港墘廠",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TW",
                "addressRegion": "新竹縣",
                "addressLocality": "竹南鎮",
                "streetAddress": "港墘里12鄰港墘路295號"
              }
            },
            {
              "@type": "Place",
              "name": "新竹寶山科園廠",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TW",
                "addressRegion": "新竹縣",
                "addressLocality": "寶山鄉",
                "streetAddress": "山湖村園區二路23號"
              }
            }
          ],
          "makesOffer": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "TWD",
            "seller": {
              "@type": "Organization",
              "name": "毅和實業股份有限公司"
            },
            "itemOffered": {
              "@type": "Product",
              "name": "預拌混凝土",
              "description": "高品質預拌混凝土產品，適用於各種建築工程",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "TWD",
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
          }
        }
      })
    }
  ]
})

const bodyHeight = ref(0)
const target = useTemplateRef<HTMLElement>('target')
const parallax = reactive(useParallax(target))
const { x, y } = useWindowScroll()

onMounted(() => {
  bodyHeight.value = document.body.scrollHeight
  console.log(bodyHeight.value)
})

const parallaxX = computed(() => {
  return (y.value / bodyHeight.value) * 100
})

</script>