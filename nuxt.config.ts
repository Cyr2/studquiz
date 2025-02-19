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
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },
  pwa: {
    manifest: {
      name: 'StudQuiz',
      short_name: 'StudQuiz',
      description: 'StudQuiz permet de créer des quiz sur mesure 100% générés par une intelligence artificielle.',
      icons: [
        {
          src: 'mely-dark.webp',
          sizes: '192x192',
          type: 'image/webp',
        },
        {
          src: 'mely.webp',
          sizes: '512x512',
          type: 'image/webp',
        },
      ],
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://studquiz.vercel.app',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
  },
  runtimeConfig: {
    geminiApi: process.env.NUXT_GEMINI_API || '',
  },
  routeRules: {
    'manifest-route-rule': {
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
