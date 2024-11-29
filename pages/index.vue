<template>
  <main class="flex items-center gap-12 px-10 max-md:flex-col">
    <NuxtImg src="/mely.webp" class="w-64"/>
    <div class="flex flex-col items-center gap-8 max-w-96">
      <h2 class="text-3xl max-sm:text-2xl font-semibold text-center tracking-wide">Testez vos connaissance sur n’importe quel sujet gratuitement</h2>
      <NuxtLink to="/new-quiz" class="text-lg uppercase w-4/5"><ButtonDefault>Nouveau Quiz !</ButtonDefault></NuxtLink>
    </div>
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
