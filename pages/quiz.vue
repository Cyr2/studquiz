<template>
  <main class="w-[50vw] max-sm:w-[80vw] flex flex-col items-center gap-8">
    <div v-if="loaded">
      <div v-if="questionRemaining > 0" class="w-full flex flex-col gap-8">
        <UProgress :value="currentQuestion" :max="quizData.length" :color="progressColor">
          <template #indicator="{ percent }">
            <div class="text-right" :style="{ width: `${percent}%` }">
              <p v-if="streak >= 4 && streak >= Math.floor((80 / 100) * quizData.length)" class="text-red-500 text-sm">🔥 Trop fort! <span class="text-xs text-red-500">(x{{ streak }})</span></p>
              <p v-else-if="streak >= 3 && streak >= Math.floor((40 / 100) * quizData.length)" class="text-blue-500 text-sm">Génial <span class="text-xs text-blue-500">(x{{ streak }})</span></p>
              <p v-else-if="streak >= 2 && streak >= Math.floor((20 / 100) * quizData.length)" class="text-sm">Pas mal <span class="text-xs text-primary">(x{{ streak }})</span></p>
            </div>
          </template>
        </UProgress>
        <QuizQuestion :question="currentQuestionData" :updateQuestion="updateQuestion" />
      </div>
      <div v-else class="flex flex-col items-center text-center gap-10">
        <hgroup class="flex flex-col gap-1">
          <h3>Quiz terminé ! 🎉</h3>
          <p class="text-xl">Votre score: <span class="font-bold">{{ score }} / {{ quizData.length }}</span></p>
        </hgroup>
        <div class="flex flex-col gap-4">
          <NuxtLink to="/new-quiz"><ButtonDefault>Nouveau Quiz</ButtonDefault></NuxtLink>
          <button @click="currentQuestion = 0; score = 0; streak = 0">Recommencer</button>
        </div>
      </div>
    </div>
    <p v-else><Loading /></p>
  </main>
</template>

<script setup lang="ts">
const quizStore = useQuizStore();
const quizData = ref([]);
const loaded = ref(false);

onMounted(() => {
  quizData.value = quizStore.quizData;
  loaded.value = true;


  if (quizData.value.length === 0) {
    const router = useRouter();
    router.push({ path: '/new-quiz', query: { error: 'No quiz data available' } });
  }
});

const currentQuestion = ref(0);
const streak = ref(0);
const score = ref(0);

const currentQuestionData = computed(() => {
  return quizData.value[currentQuestion.value];
});

const questionRemaining = computed(() => {
  return quizData.value.length - currentQuestion.value;
});

const updateQuestion = (correctAnswer: Boolean) => {
  if (correctAnswer) {
    score.value++;
    streak.value++;
  } else {
    streak.value = 0;
  }
  currentQuestion.value++;
};

const progressColor = computed(() => {
  switch (true) {
    case streak.value >= 4 && streak.value >= Math.floor((80 / 100) * quizData.value.length): return 'red';
    case streak.value >= 3 && streak.value >= Math.floor((40 / 100) * quizData.value.length): return 'blue';
    default: return 'primary'
  }
});
</script>