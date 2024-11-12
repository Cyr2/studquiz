import { useTogether } from '@/composables/useTogether';

const data = ref([]);
const loading = ref(false);

async function setData(subjectChoice, questionsLimit) {
  const { together } = useTogether();
  loading.value = true;
  try {
    const response = await together.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
      messages: [
        {
          role: 'user',
          content: 'Je souhaite obtenir un quiz en JSON sur le thème suivant : ' + subjectChoice + '. Le quiz doit comporter ' + questionsLimit + ' questions de niveau difficile, formulées de manière claire, avec des réponses concises et explicites. Les mauvaises réponses doivent être aussi détaillées et plausibles que la bonne réponse, et toutes les réponses doivent être formulées en une seule phrase. Merci de structurer les questions et réponses en suivant strictement le format JSON ci-dessous. Limitez la réponse à un JSON formaté uniquement, sans texte supplémentaire. ' + `{
  "quiz": [
    {
      "id": 1,
      "question": "",
      "answers": [
        {
          "id": 1,
          "answer": "",
          "correct": true
        },
        {
          "id": 2,
          "answer": "",
          "correct": false
        },
        {
          "id": 3,
          "answer": "",
          "correct": false
        },
        {
          "id": 4,
          "answer": "",
          "correct": false
        }
      ]
    },
    // Répétez cette structure jusqu'à atteindre {questionsLimit} questions
  ]
}`
        }
      ]
    });

    const match = response.choices[0].message.content.match(/{[\s\S]*}/);
    if (match) {
      data.value = JSON.parse(match[0]).quiz;
    } else {
      console.error('No JSON found in the response');
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
}

export { setData, data, loading };
