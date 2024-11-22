import { ref } from 'vue';
import { useRuntimeConfig } from "#app";

const data = ref([]);
const loading = ref(false);
const error = ref(false);

async function setData(subjectChoice: string, questionsLimit: number, difficulty: string) {
  const config = useRuntimeConfig();
  const API_KEY = config.public.geminiApi;
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  loading.value = true;
  error.value = false;
  try {
    const requestData = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Je souhaite obtenir un quiz en JSON sur le thème suivant : "${subjectChoice}". Le quiz doit comporter ${questionsLimit} questions de niveau ${difficulty}, formulées de manière claire, avec des réponses concises et explicites. Les mauvaises réponses doivent être aussi détaillées et plausibles que la bonne réponse, et toutes les réponses doivent être le plus courte possible afin d'éviter d'avoir de trop longue réponse. Merci de structurer les questions et réponses en suivant strictement le format JSON ci-dessous. Limitez la réponse à un JSON formaté uniquement, sans texte supplémentaire. {
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
                  // Répétez cette structure jusqu'à atteindre ${questionsLimit} questions
                ]
              }`
            }
          ]
        }
      ]
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify(requestData)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    const match = result.candidates[0].content.parts[0].text.match(/{[\s\S]*}/);
    if (match) {
      data.value = JSON.parse(match[0]).quiz;
    } else {
      console.error('No JSON found in the response');
    }
    loading.value = false;
  } catch (err) {
    console.error('Error fetching quiz data:', err);
    error.value = true;
    loading.value = false;
  }
}

export { setData, data, loading, error };