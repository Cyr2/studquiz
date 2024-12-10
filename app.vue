<template>
  <div :class="themeClass + ' ' + (themeClass ? ' bg-blue-950' : ' bg-bee-dark-blue-950')">
    <NuxtLayout class="nuxt-ui-component">
      <NuxtPage />
      <UNotifications class="nuxt-ui-component-specific" />
    </NuxtLayout>
    <Analytics />
    <SpeedInsights />
  </div>
</template>

<script setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const themeStore = useThemeStore();

const themeClass = computed(() => themeStore.isChristmasTheme ? 'christmas-theme' : '');

onMounted(() => {
  themeStore.initializeTheme();
});
</script>
