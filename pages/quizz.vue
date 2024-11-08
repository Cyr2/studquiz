<template>
  <main class="w-[50vw] flex flex-col items-center gap-8">
    <div v-if="questionRemaining > 0" class="w-full flex flex-col gap-8">
      <UProgress :value="currentQuestion + 1" :max="quizzData.length" :color="progressColor">
        <template #indicator="{ percent }">
          <div class="text-right" :style="{ width: `${percent}%` }">
            <p v-if="streak >= 4 && streak >= Math.floor((80 / 100) * quizzData.length)" class="text-red-500 text-sm">🔥 Trop fort! <span class="text-xs text-red-500">(x{{ streak }})</span></p>
            <p v-else-if="streak >= 3 && streak >= Math.floor((40 / 100) * quizzData.length)" class="text-blue-500 text-sm">Génial <span class="text-xs text-blue-500">(x{{ streak }})</span></p>
            <p v-else-if="streak >= 2 && streak >= Math.floor((20 / 100) * quizzData.length)" class="text-sm">Pas mal <span class="text-xs text-green-500">(x{{ streak }})</span></p>
          </div>
        </template>
      </UProgress>
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

const quizzData = data.quizz || [];

const currentQuestion = ref(0);
const streak = ref(0);

const currentQuestionData = computed(() => {
  return quizzData[currentQuestion.value];
});

const questionRemaining = computed(() => {
  return quizzData.length - currentQuestion.value;
});

const updateQuestion = (correctAnswer) => {
  if (correctAnswer) {
    streak.value++;
  } else {
    streak.value = 0;
  }
  currentQuestion.value++;
};

const progressColor = computed(() => {
  switch (true) {
    case streak.value >= 4 &&streak.value >= Math.floor((80 / 100) * quizzData.length): return 'red';
    case streak.value >= 3 && streak.value >= Math.floor((40 / 100) * quizzData.length): return 'blue';
    default: return 'primary'
  }
})

</script>
