<template>
  <div v-if="loading"><Loading /></div>
  <form @submit.prevent="createQuiz" class="flex flex-col gap-4" v-else>
      <div>
        <label class="text-bee-black">Type de sujet :</label>
        <span>
          <UTabs :items="subjectType" v-model="selectedType" />
        </span>
      </div>

      <InputForm
        v-if="selectedType === 0"
        v-model="subject"
        tag="input"
        label="Sujet :"
        placeholder="Entrez un sujet"
        id="subject"
        required
      />
      <InputForm
        v-if="selectedType === 1"
        v-model="subjectText"
        tag="textarea"
        label="Texte :"
        placeholder="Collez le texte ici"
        id="text"
        :rows="5"
      />

      <div class="flex flex-col gap-1">
        <label for="limit" class="text-bee-black">Nombre de questions :</label>
        <span class="flex items-center gap-2">
          <URange :min="4" :max="10" v-model="questionLimit" id="limit" />
          <span class="text-bee-black">{{ questionLimit }}</span>
        </span>
      </div>
      <div>
        <label class="text-bee-black">Difficulté :</label>
        <span>
          <UTabs :items="difficulty" v-model="selectedDifficulty" />
        </span>
      </div>
      <ButtonDefault type="submit">Créer un nouveau quiz</ButtonDefault>
    </form>
</template>

<style>
  button[aria-selected="true"] * {
    color: theme('colors.hive-yellow.500') !important;
  }
</style>

<script lang="ts" setup>
definePageMeta({
  middleware: 'password',
  colorMode: 'dark',
});
import { setData, data, loading } from "~/hooks/useQuizPrompt";

const toast = useToast();

loading.value = false;

const route = useRoute();
const router = useRouter();
const quizStore = useQuizStore();

const subjectType = [
  { label: 'Sujet', icon: 'clarity:bookmark-line' },
  { label: 'Texte', icon: 'clarity:document-line' }
];
const selectedType = ref(0);
const subject = ref('');
const subjectText = ref('');
const questionLimit = ref(4);
const difficulty = [
  { label: 'Facile', icon: 'clarity:star-line' },
  { label: 'Moyen', icon: 'clarity:half-star-solid' },
  { label: 'Difficile', icon: 'clarity:star-solid' }
];
const selectedDifficulty = ref(0);

watch(selectedType, (newValue) => {
  updateQuery({ subjectType: subjectType[newValue].label });
});

watch(selectedDifficulty, (newValue) => {
  updateQuery({ difficulty: difficulty[newValue].label });
});

function updateQuery(newQuery: Record<string, string>) {
  router.replace({ query: { ...route.query, ...newQuery } });
}

onMounted(() => {
  const errorMessage = ref(route.query.error || '');

  if(errorMessage.value) {
    toast.add({
      id: 'error',
      title: 'Error',
      description: errorMessage.value.toString(),
      icon: 'clarity:error-standard-line',
      timeout: 5000,
      closeButton: {
        color: 'red',
      },
      color: 'red',
    });
  }

  // Réinitialiser les valeurs des champs de formulaire
  selectedType.value = 0;
  subject.value = '';
  questionLimit.value = 4;
  selectedDifficulty.value = 0;

  // Réinitialiser les données du quiz
  quizStore.setQuizData(null);
});

const createQuiz = async () => {
  let content = "";
  switch(selectedType.value) {
    case 0:
      content = subject.value;
      break;
    case 1:
      content = subjectText.value;
      break;
  }
  await setData(selectedType.value, content, questionLimit.value, difficulty[selectedDifficulty.value].label);
  quizStore.setQuizData(data.value);
  router.push({ path: '/quiz' });
};
</script>
