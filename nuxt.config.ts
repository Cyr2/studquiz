export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: [
    {
      src: '~/assets/scss/global.scss',
      lang: 'scss'
    }
  ],
  runtimeConfig: {
    public : {
      togetherApi: process.env.NUXT_TOGETHER_API || ''
    }
  },
  router: {
    middleware: {
      'manifest-route-rule': {
        override: true
      }
    }
  }
})