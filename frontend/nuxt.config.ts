export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@pinia/nuxt'],

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@/assets/css/theme.css"
  ],

  devtools: { enabled: true }
})
