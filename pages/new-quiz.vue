<template>
  <div v-if="loading"><Loading /></div>
  <form @submit.prevent="createQuiz" class="flex flex-col gap-4" v-else>
      <div class="flex flex-col gap-1">
        <label for="subject" class="text-cloud-white">Sujet :</label>
        <input
          type="text"
          v-model="subject"
          placeholder="Entrez un sujet"
          id="subject"
          class="p-3.5 rounded-2xl font-bold bg-inherit border-2 border-cloud-white outline-none focus:border-hive-yellow focus:bg-bee-black"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="limit" class="text-cloud-white">Nombre de questions :</label>
        <span class="flex items-center gap-2">
          <URange :min="4" :max="10" v-model="questionLimit" id="limit" />
          <span class="text-cloud-white">{{ questionLimit }}</span>
        </span>
      </div>
      <div>
        <label class="text-cloud-white">Difficulté :</label>
        <span>
          <UTabs :items="difficulty" v-model="selectedDifficulty" />
        </span>
      </div>
      <ButtonDefault type="submit">Créer un nouveau quiz</ButtonDefault>
    </form>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'password',
});

import { setData, data, loading } from "~/hooks/useQuizPrompt";

const toast = useToast();

loading.value = false;

const route = useRoute();

onMounted(() => {
  const errorMessage = ref(route.query.error || '');

  if(errorMessage.value) {
    toast.add({
      id: 'error',
      title: 'Error',
      description: errorMessage.value,
      icon: 'clarity:error-standard-line',
      timeout: 5000,
      closeButton: {
        color: 'red',
      },
      color: 'red',
    });
  }
});

const difficulty = [{
  label: 'Facile',
  icon: 'clarity:star-line',
}, {
  label: 'Moyen',
  icon: 'clarity:half-star-solid',
}, {
  label: 'Difficile',
  icon: 'clarity:star-solid',
}];

const router = useRouter();

const quizStore = useQuizStore();
quizStore.setQuizData(null)

const subject = ref('');
const questionLimit = ref(4);
const selectedDifficulty = computed({
  get() {
    const index = difficulty.findIndex(item => item.label === route.query.difficulty);
    return index === -1 ? 0 : index;
  },
  set(value) {
    router.replace({ query: { difficulty: difficulty[value].label } });
  }
});

const createQuiz = async () => {
  await setData(subject.value, questionLimit.value, difficulty[selectedDifficulty.value].label);
  quizStore.setQuizData(data.value);
  router.push({ path: '/quiz' });
};
</script>
