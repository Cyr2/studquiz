<template>
  <header class="w-full flex justify-between items-center p-6 z-10">
    <NuxtLink to="/"><BadgeIcon icon="material-symbols:home-rounded" label="Accueil" /></NuxtLink>
    <div class="flex gap-2">
      <button @click="toggleSound">
        <BadgeIcon :icon="isSoundOn ? 'material-symbols:volume-up-rounded' : 'material-symbols:no-sound-rounded'" />
      </button>
      <button @click="toggleTheme">
        <BadgeIcon :icon="themeClass ? 'tabler:christmas-tree-off' : 'tabler:christmas-tree-filled'"  />
      </button>
    </div>
  </header>
</template>

<script setup>
import { useSoundStore } from '@/stores/sound';
import { useThemeStore } from '@/stores/theme';

const soundStore = useSoundStore();
const isSoundOn = computed(() => soundStore.isSoundOn);

const toggleSound = () => {
  soundStore.toggleSound();
};

onMounted(() => {
  soundStore.initializeSound();
});

const themeStore = useThemeStore();
const themeClass = computed(() => themeStore.isChristmasTheme ? 'christmas-theme' : '');

const toggleTheme = () => {
  themeStore.toggleTheme();
};

onMounted(() => {
  themeStore.initializeTheme();
});
</script>
