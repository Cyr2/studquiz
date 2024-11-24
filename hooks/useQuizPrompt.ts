import { ref } from 'vue';
import { useRuntimeConfig } from "#app";

const data = ref([]);
const loading = ref(false);
const error = ref(false);

async function setData(subjectChoice: string, questionsLimit: number, difficulty: string) {
  const config = useRuntimeConfig();
  const API_KEY = config.public.geminiApi;
  const model = "models/gemini-1.5-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`;
  loading.value = true;
  error.value = false;

  try {
    // Configuration JSON pour la requête
    const requestData = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Je souhaite obtenir un quiz en JSON sur le thème suivant : "${subjectChoice}". Le quiz doit comporter ${questionsLimit} questions de niveau ${difficulty}, formulées de manière claire, avec des réponses concises et explicites. Les mauvaises réponses doivent être aussi détaillées et plausibles que la bonne réponse (sans être vraie), il ne peut y avoir que 1 seule réponse vraie, et toutes les réponses doivent être le plus courte possible afin d'éviter d'avoir de trop longue réponse. Merci de structurer les questions et réponses en suivant strictement le format JSON ci-dessous. Limitez la réponse à un JSON formaté uniquement, sans texte supplémentaire. {
                "quiz": [
                  {
                    "id": 1,
                    "question": "",
                    "correctAnswerExplain": "Explique en 1 phrase la bonne réponse à cette question, sans juste dire quelle est la bonne réponse, tu peux par exemple donner une anecdote ou une explication brève.",
                    "answers": [
                      {
                        "id": 1,
                        "answer": "",
                        "correct": true,
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
      ],
      generationConfig: {
        maxOutputTokens: 8192, // Limite pour garantir une réponse complète
        temperature: 0.5,     // Contrôle la créativité
        topP: 0.7,            // Nucleus sampling
      }
    };

    // Requête Fetch optimisée
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(requestData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    // Extraction directe du JSON
    const jsonResponse = result.candidates[0]?.content?.parts[0]?.text;
    const match = jsonResponse.match(/{[\s\S]*}/);
    if (match) {
      data.value = JSON.parse(match[0]).quiz;
    } else {
      console.error('Aucun JSON valide trouvé dans la réponse');
    }

    loading.value = false;
  } catch (err) {
    console.error('Erreur lors de la récupération des données du quiz :', err);
    error.value = true;
    loading.value = false;
  }
}

export { setData, data, loading, error };
