<template>
  <div>
    <span>Chargement {{ dot }}</span>
  </div>
</template>

<script setup>
const dot = ref("...");

onMounted(() => {
  setInterval(() => {
    dot.value = dot.value === "..." ? "" : dot.value + ".";
  }, 500);
});
</script>
