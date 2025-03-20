import type { NuxtPage } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-09',
  devtools: { enabled: true },

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
    '@prisma/nuxt'
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
  vueuse: {
    autoImports: true,
  }
})