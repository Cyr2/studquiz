<template>
  <header class="w-full flex justify-between items-center p-6">
    <NuxtLink to="/"><BadgeIcon icon="material-symbols:home-rounded" label="Accueil" /></NuxtLink>
    <button @click="toggleSound">
      <BadgeIcon :icon="isSoundOn ? 'material-symbols:volume-up-rounded' : 'material-symbols:no-sound-rounded'" />
    </button>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSoundStore } from '@/stores/sound';

const soundStore = useSoundStore();
const isSoundOn = computed(() => soundStore.isSoundOn);

const toggleSound = () => {
  soundStore.toggleSound();
};

onMounted(() => {
  soundStore.initializeSound();
});
</script>
