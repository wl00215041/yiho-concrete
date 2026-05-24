<template>
  <div>
    <SeoHead
      title="菁英招募"
      description="毅和實業誠徵優秀人才加入我們的團隊！三十年穩定發展的混凝土專業公司，提供技術創新環境、人情味企業文化，歡迎有志於混凝土產業的專業人士。"
      keywords="毅和實業招募,混凝土產業徵才,預拌混凝土工作機會,新竹工作職缺,建材公司職涯,混凝土工程師,工廠作業員,品管人員,業務代表,混凝土技術人員"
      url="https://yiho-concrete.com.tw/recruit"
      image="https://yiho-concrete.com.tw/images/recruit-banner.png"
    />
    
    <PageBanner image="/images/recruit-banner.png" title="菁英招募" sub-title="Recruit" sub-title-color="#E8382F">
    </PageBanner>
    <PageSection class="mb-8" title="經營理念" icon-color="#E8382F">
      <div class="text-[#333333] mb-6 pad:mb-12 desktop:mb-14">
        <p>我們相信，混凝土不只是建築材料，而是夢想的基礎</p>
        <p>每一座廠房、每一條道路、每一個家的地基，背後都是一個人的願景。</p>
        <p>我們不只是生產混凝土，而是協助每一位客戶，將夢想穩穩築起。</p>
      </div>
      <div class="flex flex-col pad:flex-row justify-between pad:px-5">
        <RecruitCard title="穩定發展">
          <template #icon>
            <SvgoGrow filled :fontControlled="false" class="w-[52px] pad:w-[70px]"></SvgoGrow>
          </template>
          三十年來，我們從竹南到新竹，逐步擴展據點，打造技術先進、品質可靠的混凝土廠房
        </RecruitCard>
        <RecruitCard title="技術創新">
          <template #icon>
            <SvgoInnovation filled :fontControlled="false" class="w-[40px] pad:w-[53px]"></SvgoInnovation>
          </template>
          我們不斷精進設備與生產工法，確保每一立方米的混凝土都符合最高標準，讓客戶用得安心 </RecruitCard>
        <RecruitCard title="人情文化">
          <template #icon>
            <SvgoCulture filled :fontControlled="false" class="w-[57px] pad:w-[75px]"></SvgoCulture>
          </template>
          這裡沒有冰冷的工廠管理，我們像家人一樣互相扶持，讓每個人都能發揮所長
        </RecruitCard>
        <RecruitCard title="永續成長">
          <template #icon>
            <SvgoEcosystem filled :fontControlled="false" class="w-[50px] pad:w-[65px]"></SvgoEcosystem>
          </template>
          從十年的探索，到三十年的旗艦廠建設，我們持續前行，打造更專業、更高品質的混凝土品牌
        </RecruitCard>
      </div>
    </PageSection>
    <PageSection class="" title="職缺資訊" icon-color="#E8382F">
      <template #title>
        <div class="flex justify-between items-center">
          <span>職缺資訊</span>
          <ContactButton class="hidden pad:inline-block" type="mail" href="mailto:yiho470208@gmail.com">聯繫負責窗口</ContactButton>
        </div>
      </template>
      <div class="pad:hidden mb-8 text-center" >
        <ContactButton class="inline-block" type="mail" href="mailto:yiho470208@gmail.com">聯繫負責窗口</ContactButton>
      </div>

      <RecruitTable class="hidden pad:table"></RecruitTable>
      <RecruitList class="pad:hidden"></RecruitList>
    </PageSection>
  </div>
</template>
<script setup lang="ts">
import { TabsTab } from '#components';

definePageMeta({
  layout: 'page'
})

// 招募頁面結構化資料
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "毅和實業菁英招募",
        "description": "毅和實業誠徵優秀人才加入我們的團隊！三十年穩定發展的混凝土專業公司，提供技術創新環境、人情味企業文化。",
        "datePosted": new Date().toISOString(),
        "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90天後
        "employmentType": ["FULL_TIME", "PART_TIME"],
        "hiringOrganization": {
          "@type": "Organization",
          "name": "毅和實業股份有限公司",
          "sameAs": "https://yiho-concrete.com.tw",
          "logo": "https://yiho-concrete.com.tw/images/about.png"
        },
        "jobLocation": [
          {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "竹南鎮",
              "addressRegion": "新竹縣",
              "addressCountry": "TW",
              "streetAddress": "港墘里12鄰港墘路295號"
            }
          },
          {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "寶山鄉",
              "addressRegion": "新竹縣",
              "addressCountry": "TW",
              "streetAddress": "山湖村園區二路23號"
            }
          }
        ],
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "TWD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 30000,
            "maxValue": 80000,
            "unitText": "MONTH"
          }
        },
        "industry": "混凝土製造業",
        "occupationalCategory": "建築與工程",
        "qualifications": "歡迎有志於混凝土產業的專業人士",
        "responsibilities": "參與預拌混凝土生產、品質管控、客戶服務等工作",
        "benefits": "穩定發展環境、技術創新機會、人情味企業文化、永續成長平台",
        "workHours": "依職位而定",
        "url": "https://yiho-concrete.com.tw/recruit"
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "毅和實業股份有限公司",
        "description": "三十年穩定發展的預拌混凝土專業公司",
        "url": "https://yiho-concrete.com.tw",
        "logo": "https://yiho-concrete.com.tw/images/about.png",
        "foundingDate": "1993-09-26",
        "numberOfEmployees": "50-100",
        "industry": "預拌混凝土製造",
        "organizationCategory": "建材製造業",
        "knowsAbout": [
          "預拌混凝土生產",
          "建築材料供應",
          "工程技術服務",
          "品質管控"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "職業發展機會",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "JobPosting",
                "name": "穩定發展環境",
                "description": "三十年來從竹南到新竹逐步擴展，技術先進品質可靠"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "JobPosting",
                "name": "技術創新機會",
                "description": "不斷精進設備與生產工法，確保最高標準"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "JobPosting",
                "name": "人情味企業文化",
                "description": "像家人一樣互相扶持，讓每個人都能發揮所長"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "JobPosting",
                "name": "永續成長平台",
                "description": "持續前行，打造更專業更高品質的混凝土品牌"
              }
            }
          ]
        }
      })
    }
  ]
})

</script>