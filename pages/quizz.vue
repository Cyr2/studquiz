<template>
  <main class="w-[50vw] flex flex-col items-center gap-8">
    <div v-if="questionRemaining > 0">
      <UProgress :value="currentQuestion + 1" :max="quizzData.length" />
      <QuizzQuestion :question="currentQuestionData" :updateQuestion="updateQuestion" />
    </div>
    <div v-else>
      <p>Quizz completed!</p>
    </div>
    <NuxtLink to="/">Return to home</NuxtLink>
  </main>
</template>
<script setup lang="ts">
import data from "~/data/quizz.json";

const quizzData = data.quizz;

const currentQuestion = ref(0);

const currentQuestionData = computed(() => {
  return quizzData[currentQuestion.value];
});

const questionRemaining = computed(() => {
  return quizzData.length - currentQuestion.value;
});

const updateQuestion = () => {
  currentQuestion.value++;
};
</script>
