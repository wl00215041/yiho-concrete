import type { NuxtPage } from "nuxt/schema"
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
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Yiho Concrete',
      titleTemplate: '%s - Yiho Concrete',
      meta: [
        { name: 'description', content: 'Yiho Concrete' },
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
          ".prisma/client/index-browser":
          "./node_modules/@prisma/client/index-browser.js",
        },
    },
    server: {
      allowedHosts: ['yiho-concrete.cloudeasy.net']
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
    '@prisma/nuxt',
    'nuxt-file-storage',
    '@sidebase/nuxt-auth',
    'nuxt-auth-utils'
  ],
  fonts: {
    families: [
      // only resolve this font with the `google` provider
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
    baseURL: 'http://localhost:3000/api/auth',
    // isEnabled: true,
    disableServerSideAuth: true,
    globalAppMiddleware: false,
    // originEnvKey: 'AUTH_ORIGIN',
    // baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      defaultProvider: 'credentials',
    },
    
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  }
})