import { envConfig } from "./envConfig"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-09',
  ssr: true,
  devServer: {
    port: 3500,
  },
  runtimeConfig: {
    // server-side
    authSecret: envConfig.AUTH_NUXT_SECRET,
    NUXT_AUTH_ORIGIN: envConfig.AUTH_ORIGIN,
    public: {
      // client-side
    }
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: '預拌混凝土專家',
      titleTemplate: '毅和實業 - %s',
      meta: [
        { name: 'description', content: '毅和實業成立於1993年9月26日，目前設有竹南港墘廠、大厝廠以及新竹寶山科園廠，持續以先進的設備，專業的技術，產製預拌混凝土，為客戶提供優質的服務。' },
        { name: 'keywords', content: '預拌混凝土,混凝土供應商,竹南混凝土,新竹混凝土,科學園區混凝土,毅和實業,港墘廠,寶山科園廠' },
        { name: 'author', content: '毅和實業股份有限公司' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph Meta Tags
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '毅和實業' },
        { property: 'og:title', content: '毅和實業 - 預拌混凝土專家' },
        { property: 'og:description', content: '毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區，設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與服務。' },
        { property: 'og:url', content: 'https://yiho-concrete.com.tw' },
        { property: 'og:image', content: 'https://yiho-concrete.com.tw/images/about.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'zh_TW' },
        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '毅和實業 - 預拌混凝土專家' },
        { name: 'twitter:description', content: '毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區，設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與服務。' },
        { name: 'twitter:image', content: 'https://yiho-concrete.com.tw/images/about.png' },
        // Business Information
        { name: 'geo.region', content: 'TW-HSZ' },
        { name: 'geo.placename', content: '新竹縣竹南鎮' },
        { name: 'geo.position', content: '24.6838;120.8789' },
        { name: 'ICBM', content: '24.6838, 120.8789' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://yiho-concrete.com.tw' },
        { rel: 'alternate', hreflang: 'zh-tw', href: 'https://yiho-concrete.com.tw' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://yiho-concrete.com.tw' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=NTR&family=Outfit:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap' 
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "毅和實業股份有限公司",
            "alternateName": "毅和實業",
            "url": "https://yiho-concrete.com.tw",
            "logo": "https://yiho-concrete.com.tw/images/about.png",
            "description": "毅和實業成立於1993年，專業生產預拌混凝土，服務竹南、新竹地區，設有港墘廠、大厝廠及寶山科園廠，提供優質混凝土產品與服務。",
            "foundingDate": "1993-09-26",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TW",
              "addressRegion": "新竹縣",
              "addressLocality": "竹南鎮",
              "streetAddress": "港墘里12鄰港墘路295號"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "areaServed": "TW"
            },
            "sameAs": [
              "https://www.facebook.com/p/%E6%AF%85%E5%92%8C%E5%AF%A6%E6%A5%AD-%E9%A0%90%E6%8B%8C%E6%B7%B7%E5%87%9D%E5%9C%9F%E5%B0%88%E5%AE%B6-100063971286601/?locale=zh_TW",
            ]
          })
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' }
  },
  site: {
    name: '毅和實業',
    url: 'https://yiho-concrete.com.tw',
  },
  vite: {
    resolve: {
      alias: {
          ".prisma/client/index-browser": "./node_modules/@prisma/client/index-browser.js",
        },
    },
    server: {
      allowedHosts: ['yiho-concrete.cloudeasy.net', 'yiho-concrete.com.tw', 'www.yiho-concrete.com.tw']
    }
  },
  vue: {
    propsDestructure: true
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    payloadExtraction: false
  },
  build: {
    transpile: ['trpc-nuxt']
  },
  modules: [
    '@vueuse/nuxt',
    '@formkit/auto-animate',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    // '@nuxt/fonts',
    'nuxt-svgo',
    'vue3-carousel-nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/tailwindcss',
    // '@prisma/nuxt',
    'nuxt-file-storage',
    '@sidebase/nuxt-auth',
    'nuxt-auth-utils',
    'nuxt-aos',
    'dayjs-nuxt'
  ],
  // fonts: {
  //   families: [
  //     // only resolve this font with the `google` provider
  //     { name: 'NTR', provider: 'google' },
  //     { name: 'Noto Sans TC', provider: 'google' },
  //     { name: 'Outfit', provider: 'google' },
  //   ]
  // },
  carousel: {
    prefix: 'yiho'
  },
  i18n: {
    locales: [
      { code: 'zh-tw', language: 'zh-TW' },
      { code: 'en', language: 'en-US' },
    ],
    defaultLocale: 'en',
  },
  fileStorage: {
    mount: './public/files'
  },
  vueuse: {
    autoImports: true,
  },
  auth: {
    isEnabled: true,
    baseURL: process.env.NODE_ENV === 'production' ? 'https://yiho-concrete.com.tw' : 'http://localhost:3500',
    disableServerSideAuth: false, // 啟用服務端 auth 以支持 tRPC
    globalAppMiddleware: {
      isEnabled: false, // 禁用全域中間件，使用自定義重定向
    },
    provider: {
      type: 'authjs',
      defaultProvider: 'credentials',
      trustHost: true, // 生產環境需要信任 host
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false, // 在 SSR 模式下禁用以避免問題
    },
  },
  aos: {
    offset: 200
  },
  sitemap: {
    exclude: ['/k-manager/**'],
    sources: ['/api/__sitemap__/urls'],
    autoLastmod: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
    urls: [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/products',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/achievements',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/location',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/recruit',
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/esg',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      }
    ]
  }
})
