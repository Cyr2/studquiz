<template>
  <li :class="{'correct': questionDone && answer.correct}">
    <input type="radio" :id="answer.id" :value="answer.id" :name="questionId" :checked="selectedAnswers === answer.id" required :disabled="questionDone" @change="handleChange" />
    <label :for="answer.id">{{ answer.answer }}</label>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  answer: { id: number; answer: string; correct: boolean };
  questionId: number;
  selectedAnswers: string | null;
  questionDone: boolean;
}>();

const emit = defineEmits(['update:selectedAnswers']);

const handleChange = () => {
  emit('update:selectedAnswers', props.answer.id);
};
</script>

<style scoped>
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