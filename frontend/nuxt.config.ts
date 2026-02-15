export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@pinia/nuxt'],

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@/assets/css/theme.css"
  ],

  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:4000/api"
    }
  },

  devtools: { enabled: true }
})
