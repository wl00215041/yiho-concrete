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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  build: {
    transpile: ['trpc-nuxt']
  },
  modules: [
    '@vueuse/nuxt',
    '@formkit/auto-animate',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    '@nuxt/fonts',
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
  fonts: {
    families: [
      // only resolve this font with the `google` provider
      { name: 'NTR', provider: 'google' },
      { name: 'Noto Sans TC', provider: 'google' },
      { name: 'Outfit', provider: 'google' },
    ]
  },
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
  }
})
