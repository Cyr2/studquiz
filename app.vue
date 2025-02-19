<template>
  <div :class="themeClass" class="bg-bee-dark-blue-950">
    <NuxtLayout class="nuxt-ui-component">
      <NuxtPage />
      <UNotifications class="nuxt-ui-component-specific" />
    </NuxtLayout>
    <Analytics />
    <SpeedInsights />
    <VitePwaManifest />
    <div v-if="showUpdateNotification">
      <span>
        Nouveau contenu disponible, cliquez sur le bouton de rechargement pour mettre à jour.
      </span>
      <button @click="updateServiceWorker">
        Recharger
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { useToast } from 'vue-toastification';
import { ref, onMounted, computed } from 'vue';

const themeStore = useThemeStore();
const { $pwa } = useNuxtApp();
const toast = useToast();

const themeClass = computed(() => themeStore.isChristmasTheme ? 'christmas-theme' : '');
const showUpdateNotification = ref(false);

const updateServiceWorker = async () => {
  await $pwa.updateServiceWorker(true);
  showUpdateNotification.value = false;
};

onMounted(() => {
  themeStore.initializeTheme();
  if ($pwa.offlineReady) {
    toast.success('App ready to work offline');
  }
  if ($pwa.needRefresh) {
    showUpdateNotification.value = true;
  }
});
</script>