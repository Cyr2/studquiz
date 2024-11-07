<template>
  <form @submit.prevent="displayResult">
    <h3>{{ question.question }}</h3>
    <ul>
      <li v-for="answer in shuffledAnswers" :key="answer.id" >
        <input type="radio" :id="answer.id" :value="answer" :name="question.id" v-model="selectedAnswers" required />
        <label :for="answer.id">{{ answer.answer }}</label>
      </li>
    </ul>
    <button type="submit">Next</button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  question: object;
  updateQuestion: () => void;
}>();

const question = computed(() => props.question);

const shuffledAnswers = computed(() => {
  return question.value.answers.sort(() => Math.random() - 0.5);
});

const selectedAnswers = ref<object | null>(null);

const correctAnswer = computed(() => {
  return question.value.answers.find((answer: any) => answer.correct);
});

const displayResult = () => {
  if(selectedAnswers.value.correct) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  selectedAnswers.value = null;
  props.updateQuestion();
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
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

li:hover {
  transform: translateY(.15rem);
  box-shadow: 0 0 #4b4b4b;
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
</style>