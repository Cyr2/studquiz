<template>
  <main class="flex items-center gap-12 px-10 max-md:flex-col">
    <NuxtImg src="/mely-dark.webp" class="w-64 select-none" draggable="false"/>
    <div class="flex flex-col items-center gap-8 max-w-96">
      <h2 class="text-3xl max-lg:text-2xl font-semibold text-center tracking-wide">Testez vos connaissances sur n'importe quel sujet gratuitement</h2>
      <div class="flex flex-col gap-4 w-full">
        <NuxtLink to="/new-quiz" class="w-full">
          <ButtonDefault class="w-full">Nouveau Quiz !</ButtonDefault>
        </NuxtLink>
      </div>
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
