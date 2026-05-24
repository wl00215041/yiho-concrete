/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    screens: {
      // 'sm': '640px',
      // 'md': '768px',
      'lg': '1024px',
      pad: '1024px',
      desktop: '1440px'
    },
    fontFamily: {
      NTR: ['NTR', 'Noto Sans TC'],
      Outfit : ['Outfit', 'Noto Sans TC'],
    },
    extend: {

    },
  },
  plugins: [],
}