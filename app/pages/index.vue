<template>
  <div>
    <SeoHead
      title="預拌混凝土專家"
      description="毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區。設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與專業服務，是您值得信賴的混凝土供應商。"
      keywords="毅和實業,預拌混凝土,混凝土供應商,竹南混凝土,新竹混凝土,科學園區混凝土,港墘廠,寶山科園廠,混凝土廠商,混凝土公司,混凝土價格,混凝土施工,混凝土品質保證"
      url="https://yiho-concrete.com.tw"
      image="https://yiho-concrete.com.tw/images/about.png"
    />
    
    <HomeHeader></HomeHeader>
    <div class="carousel relative mb-8 pad:mb-14 desktop:mb-[76px]">
      <HomeSlogan class="slogan-placement"></HomeSlogan>
      <HomeCarousel></HomeCarousel>
      <HomeAnnouncement></HomeAnnouncement>
    </div>
    <HomeAchievementSection class="mb-8"></HomeAchievementSection>
    <HomeAboutSection></HomeAboutSection>
    <HomeProductSection></HomeProductSection>
  </div>
</template>

<script setup lang="ts">
// 首頁結構化資料
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "毅和實業股份有限公司",
        "alternateName": "毅和實業",
        "description": "毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區，設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與服務。",
        "url": "https://yiho-concrete.com.tw",
        "logo": "https://yiho-concrete.com.tw/images/about.png",
        "image": "https://yiho-concrete.com.tw/images/about.png",
        "foundingDate": "1993-09-26",
        "phone": "037470212",
        "address": [
          {
            "@type": "PostalAddress",
            "name": "港墘廠",
            "addressCountry": "TW",
            "addressRegion": "新竹縣",
            "addressLocality": "竹南鎮",
            "streetAddress": "港墘里12鄰港墘路295號"
          },
          {
            "@type": "PostalAddress",
            "name": "寶山科園廠",
            "addressCountry": "TW",
            "addressRegion": "新竹縣",
            "addressLocality": "寶山鄉",
            "streetAddress": "山湖村園區二路23號"
          }
        ],
        "geo": [
          {
            "@type": "GeoCoordinates",
            "latitude": "24.6838",
            "longitude": "120.8789"
          }
        ],
        "areaServed": [
          "新竹縣",
          "新竹市",
          "苗栗縣"
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "24.6838",
            "longitude": "120.8789"
          },
          "geoRadius": "50000"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "預拌混凝土產品",
          "itemListElement": [
            {
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
                "image": "https://yiho-concrete.com.tw/images/about.png",
                "description": "高品質預拌混凝土，適用於各種建築工程",
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
            }
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "areaServed": "TW",
          "availableLanguage": ["Chinese", "zh-TW"]
        },
        "sameAs": [
          "https://www.facebook.com/p/%E6%AF%85%E5%92%8C%E5%AF%A6%E6%A5%AD-%E9%A0%90%E6%8B%8C%E6%B7%B7%E5%87%9D%E5%9C%9F%E5%B0%88%E5%AE%B6-100063971286601/?locale=zh_TW",
        ]
      })
    }
  ]
})
</script>

<style lang="scss" scoped>

.slogan-placement {
  @apply absolute pad:top-[170px] desktop:top-auto desktop:bottom-32 left-[84px];
}


:deep(section.carousel) {
  @apply mb-6 pad:pl-[2.8125rem];
}





</style>