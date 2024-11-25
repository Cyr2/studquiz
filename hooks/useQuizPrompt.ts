import { ref } from 'vue';

const data = ref([]);
const loading = ref(false);
const error = ref(false);

async function setData(subjectChoice: string, questionsLimit: number, difficulty: string) {
  loading.value = true;
  error.value = false;

  try {
    const res = await fetch('/api/generateQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectChoice, questionsLimit, difficulty }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    data.value = result;

    loading.value = false;
  } catch (err) {
    console.error('Erreur lors de la récupération des données du quiz :', err);
    error.value = true;
    loading.value = false;
  }
}

export { setData, data, loading, error };