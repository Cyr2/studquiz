export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@formkit/auto-animate', '@nuxtjs/color-mode'],
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: ''
  },
  css: [
    {
      src: '~/assets/scss/global.scss',
      lang: 'scss',
    },
  ],
  runtimeConfig: {
    public : {
      geminiApi: process.env.NUXT_GEMINI_API || '',
      password: process.env.NUXT_PASSWORD || ''
    }
  },
  routeRules: {
    'manifest-route-rule': {
      middleware: 'password',
      override: true
    }
  },
  render: {
    csp: {
      addMeta: true,
      policies: {
        'default-src': ["'self'"],
      }
    }
  }
})