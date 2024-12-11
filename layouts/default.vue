<template>
  <main class="min-h-screen flex flex-col justify-between relative">
    <div v-if="themeClass" class="absolute bottom-0 left-0 w-screen">
      <NuxtImg src="/christmas/snow-bg.png" class="fixed bottom-0 z-10 w-full"/>
      <ChristmasSnowfallCanvas v-if="!isQuizPage" />
    </div>
    <DefaultHeader />
    <div class="flex flex-col items-center z-20">
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

const route = useRoute();
const isQuizPage = computed(() => route.path === '/quiz');
</script>