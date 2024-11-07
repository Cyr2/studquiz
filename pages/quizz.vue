<template>
  <h1>StudBee</h1>
  <div v-if="questionRemaining > 0">
    <UProgress :value="currentQuestion + 1" :max="quizzData.length" />
    <Question :question="currentQuestionData" :updateQuestion="updateQuestion" />
  </div>
  <div v-else>
    <p>Quizz completed!</p>
  </div>
  <NuxtLink to="/">Return to home</NuxtLink>
</template>
<script setup lang="ts">
import data from "~/data/quizz.json";
import Question from "~/components/question.vue";

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

<style>

</style>