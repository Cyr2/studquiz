<template>
  <h3>{{ question.question }}</h3>
  <form @submit.prevent="displayResult">
    <ul>
      <li v-for="answer in question.answers" :key="answer.id" >
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
  props.updateQuestion();
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.correct {
  background-color: greenyellow;
}
.incorrect {
  background-color: lightcoral;
}
</style>