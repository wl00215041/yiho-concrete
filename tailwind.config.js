/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
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