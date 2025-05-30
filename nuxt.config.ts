import { envConfig } from "./envConfig"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-09',
  ssr: false,
  devServer: {
    port: 3500,
  },
  runtimeConfig: {
    // server-side
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
    // baseURL: '/api/auth',
    // isEnabled: true,
    disableServerSideAuth: true,
    globalAppMiddleware: false,
    // originEnvKey: 'AUTH_ORIGIN',
    // baseURL: '/api/auth',
    baseURL: 'http://localhost:3500/api/auth',
    provider: {
      type: 'authjs',
      defaultProvider: 'credentials',
      trustHost: false,
      addDefaultCallbackUrl: true
    },
    
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },
  aos: {
    offset: 200
  },
  sitemap: {
    exclude: ['/k-manager/**']
  }
})
