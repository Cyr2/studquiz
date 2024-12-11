<template>
  <main class="min-h-screen flex flex-col justify-between relative">
    <NuxtImg v-if="themeClass" src="/christmas/snow-bg.png" class="fixed bottom-0 left-0 w-full z-10 pointer-events-none"/>
    <DefaultHeader />
    <div class="flex flex-col items-center">
      <slot />
    </div>
    <DefaultFooter />
  </main>
</template>

<script setup lang="ts">
import DefaultHeader from "~/components/Header.vue";
import DefaultFooter from "~/components/Footer.vue";

const themeStore = useThemeStore();
const themeClass = computed(() => themeStore.isChristmasTheme ? 'christmas-theme' : '');
</script>
