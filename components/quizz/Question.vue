<template>
  <main class="flex flex-col items-center text-center gap-8">
    <h3>{{ question.question }}</h3>
    <ul class="flex flex-col items-center w-full gap-4">
      <li v-for="answer in shuffledAnswers" :key="answer.id" :class="{'correct': questionDone && answer.correct, 'shadow-defaultInputHover': questionDone}" class="relative w-full uppercase font-bold p-3.5 rounded-2xl border-2 border-blue-dark-light bg-blue-dark-dark shadow-defaultInput hover:translate-y-1 hover:shadow-defaultInputHover">
        <input type="radio" :id="answer.id" :value="answer.id" :name="question.id" v-model="selectedAnswers" required :disabled="questionDone" class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"  />
        <label :for="answer.id">{{ answer.answer }}</label>
      </li>
    </ul>
    <ButtonDefault @click="displayResult" v-if="!questionDone">Suivant</ButtonDefault>
    <ButtonDefault @click="nextQuestion" v-else>Prochaine question</ButtonDefault>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
  question: {
    id: number;
    question: string;
    answers: { id: number; answer: string; correct: boolean }[];
  };
  updateQuestion: () => void;
}>();

const question = computed(() => props.question);

const shuffledAnswers = ref(props.question.answers);

const selectedAnswers = ref<string | null>(null);

const questionDone = ref(false);

onMounted(() => {
  shuffledAnswers.value = [...props.question.answers].sort(() => Math.random() - 0.5);
});

const displayResult = () => {
  questionDone.value = true;
};

const nextQuestion = () => {
  questionDone.value = false;
  selectedAnswers.value = null;
  props.updateQuestion();
  shuffledAnswers.value = [...props.question.answers].sort(() => Math.random() - 0.5);
};
</script>

<style>
li:has(input:checked) {
  color: #1e97d4;
  box-shadow: 0 0;
  transform: translateY(.25rem);
  border-color: #1e97d4;
  background-color: #253339;
}

.correct {
  color: #58cc02 !important;
  border: 2px solid #58cc02 !important;
  background-color: #253339;
}
</style>