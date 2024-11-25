<template>
  <main class="flex flex-col items-center gap-8">
    <h2 class="text-2xl">Bienvenue !</h2>
    <UButton class="text-lg"><NuxtLink to="/new-quiz">Nouveau Quiz</NuxtLink></UButton>
  </main>
</template>
<script setup>
definePageMeta({
  colorMode: 'dark',
})
</script>
<style lang="scss">
 * {
   color: white;
 }
</style>
