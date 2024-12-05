<template>
  <div class="christmas-theme bg-bee-dark-blue-950">
    <NuxtLayout class="nuxt-ui-component">
      <NuxtPage />
      <UNotifications class="nuxt-ui-component-specific" />
    </NuxtLayout>
  </div>
  <Analytics/>
  <SpeedInsights/>
</template>

<script setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
