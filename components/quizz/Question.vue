<template>
  <main class="flex flex-col items-center text-center gap-8">
    <h3 class="text-2xl font-medium text-cloud-white">{{ question.question }}</h3>
    <ul class="flex flex-col items-center w-full gap-4">
      <li
        v-for="answer in shuffledAnswers"
        :key="answer.id"
        class="relative w-full uppercase font-bold p-3.5 rounded-2xl border-2 border-wax-gray"
        :class="[
          {'!border-sucess': correctAnswer !== null && answer.correct},
          {'!border-nectar-red': correctAnswer === false && selectedAnswers === answer.id},
          correctAnswer === null ? 'shadow-defaultInput hover:shadow-defaultInputHover translate-y-0 hover:translate-y-1' : 'translate-y-1'
        ]"
      >
        <input
          type="radio"
          :id="answer.id"
          :value="answer.id"
          :name="question.id"
          v-model="selectedAnswers"
          required
          :disabled="correctAnswer !== null"
          class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
        />
        <label
          :for="answer.id"
          :class="{
            '!text-sucess': correctAnswer !== null && answer.correct,
            '!text-nectar-red': correctAnswer === false && selectedAnswers === answer.id
          }"
        >
          {{ answer.answer }}
        </label>
      </li>
    </ul>
    <p
      v-if="correctAnswer === false"
      class="absolute bottom-0 p-6 w-screen text-center bg-nectar-red text-pollen-white"
    >
      {{ question.correctAnswerExplain }}
    </p>
    <ButtonDefault @click="displayResult" v-if="correctAnswer === null" :disabled="!selectedAnswers">Valider la réponse</ButtonDefault>
    <ButtonDefault @click="nextQuestion" v-else>Continuer</ButtonDefault>
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  question: {
    id: number;
    question: string;
    correctAnswerExplain: string;
    answers: { id: number; answer: string; correct: boolean }[];
  };
  updateQuestion: () => void;
}>();

const question = computed(() => props.question);

const shuffledAnswers = ref([...props.question.answers].sort(() => Math.random() - 0.5));

const selectedAnswers = ref<string | null>(null);

const correctAnswer = ref<boolean | null>(null);

watch(() => props.question, () => {
  shuffledAnswers.value = [...props.question.answers].sort(() => Math.random() - 0.5);
  selectedAnswers.value = null;
  correctAnswer.value = null;
});
const displayResult = () => {
  correctAnswer.value = selectedAnswers.value === props.question.answers.find((answer) => answer.correct)?.id;
};

const nextQuestion = () => {
  props.updateQuestion(correctAnswer.value);
};
</script>

<style>
li:has(input:checked) {
  box-shadow: 0 0;
  transform: translateY(.25rem);
  border-color: #1e97d4;
  background-color: #253339;
  label {
    color: #1e97d4;
  }
}
</style>
