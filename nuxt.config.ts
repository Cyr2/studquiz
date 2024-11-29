export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@formkit/auto-animate', '@nuxtjs/color-mode', '@nuxt/image'],
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
  app: {
    head: {
      title: 'StudQuiz',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      description: 'StudQuiz permet de créer des quiz sur mesure 100% générés par une intelligence artificielle.',
      keywords: 'quiz, intelligence artificielle, ia, ai, révisions, éducation, apprentissage, StudQuiz',
      author: 'Darius',
      ogTitle: 'StudQuiz',
      ogDescription: 'StudQuiz permet de créer des quiz sur mesure 100% générés par une intelligence artificielle.',
      ogType: 'website',
      ogUrl: 'https://studquiz.vercel.app'
    },
  },
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