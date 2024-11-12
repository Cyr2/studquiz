<template>
  <p v-if="loading">Loading...</p>
  <form @submit.prevent="createQuiz" class="flex flex-col gap-4" v-else>
    <div class="flex flex-col gap-1">
      <label for="subject">Sujet :</label>
      <input type="text" v-model="subject" placeholder="Entrez un sujet" id="subject" class="p-3.5 rounded-2xl font-bold bg-blue-dark-dark border-2 border-blue-dark-light outline-none focus:border-green-500" required>
    </div>
    <div class="flex flex-col gap-1">
      <label for="limit">Nombre de questions :</label>
      <span class="flex items-center gap-2">
        <URange :min="4" :max="10" :step="2" v-model="questionLimit" id="limit"/>
        <span>{{ questionLimit }}</span>
      </span>
    </div>
    <ButtonDefault type="submit">Créer un nouveau quiz</ButtonDefault>
  </form>
</template>

<script lang="ts" setup>
import { setData, data, loading } from "~/hooks/useQuizPrompt"
loading.value = false;

const router = useRouter();

const quizzStore = useQuizzStore();
const subject = ref('');
const questionLimit = ref(4);

const createQuiz = async () => {
  await setData(subject.value, questionLimit.value);
  quizzStore.setQuizzData(data.value);
  router.push({ path: '/quizz' });
};
</script>