<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
  <Analytics/>
  <SpeedInsights/>
</template>

<script setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
