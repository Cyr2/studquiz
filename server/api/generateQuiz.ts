import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_KEY = config.public.geminiApi;
  const model = "models/gemini-1.5-flash";

  const { subjectChoice, questionsLimit, difficulty } = await readBody(event);

  if (questionsLimit > 8192) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Limite de questions dépassée. Maximum 8192 questions autorisées.',
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`;

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
      maxOutputTokens: 8192,
      temperature: 0.5,
      topP: 0.7,
    }
  };

  const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
      } catch (err) {
        if (i === retries - 1) {
          throw err;
        }
      }
    }
  };

  try {
    const result = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(requestData),
    });

    const jsonResponse = result.candidates[0]?.content?.parts[0]?.text;
    const match = jsonResponse.match(/{[\s\S]*}/);
    if (match) {
      return JSON.parse(match[0]).quiz;
    } else {
      throw new Error('Aucun JSON valide trouvé dans la réponse');
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données du quiz',
      data: err.message,
    });
  }
});