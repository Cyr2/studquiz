<template>
  <div>
    <span>Quiz en cours de création {{ dot }}</span>
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
