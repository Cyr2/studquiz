<template>
  <header class="w-full flex justify-between items-center p-6">
    <NuxtLink to="/" class="w-8 h-8 rounded-md flex items-center justify-center bg-bee-black-900 border-2 border-bee-black-800 hover:border-hive-yellow-500"><Icon name="material-symbols:home-rounded" aria-label="Accueil"/></NuxtLink>
    <button @click="toggleSound" class="w-8 h-8 rounded-md flex items-center justify-center bg-bee-black-900 border-2 border-bee-black-800 hover:border-hive-yellow-500">
      <Icon :name="isSoundOn ? 'material-symbols:volume-up-rounded' : 'material-symbols:no-sound-rounded'" size="18"/>
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
