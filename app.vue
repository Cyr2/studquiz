<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
  <Analytics/>
</template>

<script setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { Analytics } from '@vercel/analytics/nuxt'
</script>
