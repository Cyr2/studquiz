export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@formkit/auto-animate', '@nuxtjs/color-mode', '@nuxt/image', '@vite-pwa/nuxt'],
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: ''
  },
  css: ['~/assets/scss/global.scss'],
  app: {
    head: {
      title: 'StudQuiz',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'StudQuiz permet de créer des quiz sur mesure 100% générés par une intelligence artificielle.' },
        { name: 'keywords', content: 'quiz, intelligence artificielle, ia, ai, révisions, éducation, apprentissage, StudQuiz' },
        { name: 'author', content: 'Cyri' },
        { property: 'og:title', content: 'StudQuiz' },
        { property: 'og:description', content: 'StudQuiz permet de créer des quiz sur mesure 100% générés par une intelligence artificielle.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://studquiz.vercel.app' }
      ]
    }
  },
  runtimeConfig: {
    geminiApi: process.env.NUXT_GEMINI_API || '',
    public : {
      password: process.env.NUXT_PASSWORD || ''
    },
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