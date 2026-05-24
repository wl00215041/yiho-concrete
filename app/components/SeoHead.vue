<template>
  <div></div>
</template>

<script setup lang="ts">
interface SeoProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  locale?: string
  siteName?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
}

const props = withDefaults(defineProps<SeoProps>(), {
  title: '預拌混凝土專家',
  description: '毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區，設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與服務。',
  keywords: '預拌混凝土,混凝土供應商,竹南混凝土,新竹混凝土,科學園區混凝土,毅和實業,港墘廠,寶山科園廠',
  image: 'https://yiho-concrete.com.tw/images/about.png',
  url: 'https://yiho-concrete.com.tw',
  type: 'website',
  locale: 'zh_TW',
  siteName: '毅和實業',
  author: '毅和實業股份有限公司',
  noIndex: false
})

const route = useRoute()
const currentUrl = `https://yiho-concrete.com.tw${route.path}`

// 設定頁面標題
const pageTitle = props.title === '預拌混凝土專家' ? props.title : `${props.title}`

// 設定 meta 標籤
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: props.description },
    { name: 'keywords', content: props.keywords },
    { name: 'author', content: props.author },
    { name: 'robots', content: props.noIndex ? 'noindex, nofollow' : 'index, follow' },
    
    // Open Graph Meta Tags
    { property: 'og:type', content: props.type },
    { property: 'og:site_name', content: props.siteName },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: props.description },
    { property: 'og:url', content: props.url || currentUrl },
    { property: 'og:image', content: props.image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: props.locale },
    
    // Twitter Card Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image },
    
    // Article specific meta (if applicable)
    ...(props.publishedTime ? [{ property: 'article:published_time', content: props.publishedTime }] : []),
    ...(props.modifiedTime ? [{ property: 'article:modified_time', content: props.modifiedTime }] : []),
    ...(props.section ? [{ property: 'article:section', content: props.section }] : []),
    ...(props.tags ? props.tags.map(tag => ({ property: 'article:tag', content: tag })) : []),
  ],
  link: [
    { rel: 'canonical', href: props.url || currentUrl },
  ]
})

// 結構化資料
const structuredData = computed(() => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": props.type === 'article' ? 'Article' : 'WebPage',
    "name": pageTitle,
    "description": props.description,
    "url": props.url || currentUrl,
    "image": props.image,
    "author": {
      "@type": "Organization",
      "name": props.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "毅和實業股份有限公司",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yiho-concrete.com.tw/images/about.png"
      }
    }
  }

  if (props.type === 'article' && props.publishedTime) {
    return {
      ...baseData,
      "datePublished": props.publishedTime,
      "dateModified": props.modifiedTime || props.publishedTime,
      "headline": pageTitle,
      "articleSection": props.section,
      "keywords": props.tags?.join(', ') || props.keywords
    }
  }

  return baseData
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    }
  ]
})
</script>