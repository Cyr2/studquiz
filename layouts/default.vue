<template>
  <main class="min-h-screen flex flex-col justify-between bg-snow bg-no-repeat bg-contain bg-bottom">
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
</script>
