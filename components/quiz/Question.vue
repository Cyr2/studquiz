<template>
  <main class="flex flex-col items-center text-center gap-8">
    <h3 class="text-2xl max-sm:text-lg font-medium text-bee-black-100">{{ question.question }}</h3>
    <ul class="flex flex-col items-center w-full gap-4">
      <li
        v-for="answer in shuffledAnswers"
        :key="answer.id"
        class="relative w-full uppercase font-bold max-sm:text-sm p-3.5 rounded-2xl border-2 border-bee-black-700"
        :class="[
          {'!border-spring-green-500': correctAnswer !== null && answer.correct},
          {'!border-nectar-red-400': correctAnswer === false && selectedAnswers === answer.id},
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
            '!text-spring-green-500': correctAnswer !== null && answer.correct,
            '!text-nectar-red-400': correctAnswer === false && selectedAnswers === answer.id
          }"
        >
          {{ answer.answer }}
        </label>
      </li>
    </ul>
    <p
      v-if="correctAnswer === false && showExplanation"
      class="fixed bottom-0 w-screen h-fit p-6 text-center bg-nectar-red-400"
    >
        <button @click="hideExplanation" class="absolute top-3 right-3 z-50">X</button>
        <span>{{ question.correctAnswerExplain }}</span>
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
  updateQuestion: (correctAnswer: Boolean) => void;
}>();

const question = computed(() => props.question);

const shuffledAnswers = ref([...props.question.answers].sort(() => Math.random() - 0.5));

const selectedAnswers = ref<string | null>(null);

const correctAnswer = ref<boolean | null>(null);

const showExplanation = ref<boolean>(true);

const correctSound = new Audio('/audio/correct.mp3');
const incorrectSound = new Audio('/audio/incorrect.mp3');

watch(() => props.question, () => {
  shuffledAnswers.value = [...props.question.answers].sort(() => Math.random() - 0.5);
  selectedAnswers.value = null;
  correctAnswer.value = null;
  showExplanation.value = true;
});

const displayResult = () => {
  correctAnswer.value = selectedAnswers.value === props.question.answers.find((answer) => answer.correct)?.id;
  if (correctAnswer.value) {
    correctSound.play();
  } else {
    incorrectSound.play();
  }
};

const nextQuestion = () => {
  correctSound.pause();
  incorrectSound.pause();
  correctSound.currentTime = 0;
  incorrectSound.currentTime = 0;
  props.updateQuestion(correctAnswer.value);
};

const hideExplanation = () => {
  showExplanation.value = false;
};
</script>

<style>
li:has(input:checked) {
  box-shadow: 0 0;
  transform: translateY(.25rem);
  border-color: theme(colors.bee-dark-blue.300);
  background-color: #253339;
  label {
    color: theme(colors.bee-dark-blue.300);
  }
}
</style>
