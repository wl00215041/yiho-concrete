import type { NuxtPage } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-09',
  devtools: { enabled: true },

  vue: {
    propsDestructure: true
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@formkit/auto-animate',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    '@nuxt/fonts',
    'nuxt-svgo',
    'vue3-carousel-nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/tailwindcss'
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
  vueuse: {
    autoImports: true,
  }
})