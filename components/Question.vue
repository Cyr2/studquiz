<template>
  <h3>{{ question.question }}</h3>
  <ul :class="{'answered': questionDone}">
    <li v-for="answer in shuffledAnswers" :key="answer.id" :class="{'correct': questionDone && answer.correct}">
      <input type="radio" :id="answer.id" :value="answer.id" :name="question.id" v-model="selectedAnswers" required :disabled="questionDone"  />
      <label :for="answer.id">{{ answer.answer }}</label>
    </li>
  </ul>
  <button @click="displayResult" v-if="!questionDone">Suivant</button>
  <button @click="nextQuestion" v-else>Prochaine question</button>
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
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

li {
  font-weight: 700;
  border: 2px solid #4b4b4b;
  border-radius: 1rem;
  background-color: #1b2428;
  width: 100%;
  padding: .8rem;
  text-transform: uppercase;
  box-shadow: 0 .15rem #4b4b4b;
  transition: .2s;
  position: relative;
}

li:hover, .answered li {
  transform: translateY(.15rem) !important;
  box-shadow: 0 0 #4b4b4b !important;
}

li:has(input:checked) {
  color: #1e97d4;
  box-shadow: 0 0;
  transform: translateY(.15rem);
  border-color: #1e97d4;
  background-color: #253339;
}

input {
  cursor: pointer;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.correct {
  color: #58cc02 !important;
  border: 2px solid #58cc02 !important;
  box-shadow: 0 .15rem #58cc02 !important;
  background-color: #253339;
}
</style>