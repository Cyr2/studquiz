import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_KEY = config.openaiApiKey;
  const model = "gpt-4o";

  const { selectedType, subjectChoice, questionsLimit, difficulty } = await readBody(event);

  if (questionsLimit > 8192) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Limite de questions dépassée. Maximum 8192 questions autorisées.',
    });
  }

  let contentPrompt = '';
  switch (selectedType) {
    case 0:
      contentPrompt = 'sur le thème suivant';
      break;
    case 1:
      contentPrompt = 'à partir du texte suivant';
      break;
    default:
      throw createError({
        statusCode: 400,
        statusMessage: 'Type sélectionné invalide.',
      });
  }

  const prompt = `Je souhaite générer un quiz JSON précis et sans ambiguïté sur "${subjectChoice}". Le quiz doit respecter les contraintes suivantes :

RÈGLES DE GÉNÉRATION :
- Nombre total de questions : ${questionsLimit}
- Niveau de difficulté : ${difficulty}
- UNE SEULE réponse correcte par question
- Réponses concises (max 10 mots)
- Fausses réponses DISTINCTES et CLAIREMENT incorrectes

CRITÈRES QUALITATIFS :
1. Éviter les réponses interchangeables ou partiellement vraies
2. Créer des distracteurs plausibles mais manifestement faux
3. Chaque réponse doit être significativement différente
4. Utiliser des contextes ou indices pour préciser les questions

FORMAT JSON STRICT :
{
  "quiz": [
    {
      "id": 1,
      "question": "Formulation précise et sans ambiguïté",
      "questionContext": "Contexte ou indice supplémentaire",
      "difficulty": "niveau de difficulté de la question",
      "tags": ["catégorie", "sous-catégorie"],
      "correctAnswerExplain": "Explication brève mais distinctive de la réponse correcte. Si tu n'as rien à expliquer, alors raconte une anecdote en rapport avec la question.",
      "answers": [
        {
          "id": 1,
          "answer": "Réponse correcte",
          "correct": true,
          "uniqueIdentifier": "Mot-clé distinctif"
        },
        {
          "id": 2,
          "answer": "Première réponse incorrecte",
          "correct": false,
          "wrongAnswerReason": "Explication de l'incorrection"
        },
        {
          "id": 3,
          "answer": "Deuxième réponse incorrecte",
          "correct": false,
          "wrongAnswerReason": "Explication de l'incorrection"
        },
        {
          "id": 4,
          "answer": "Troisième réponse incorrecte",
          "correct": false,
          "wrongAnswerReason": "Explication de l'incorrection"
        }
      ]
    }
    // Répéter la structure pour ${questionsLimit} questions
  ]
}

INSTRUCTIONS SPÉCIALES :
- Aucune réponse ne doit être vague ou facilement confondue
- Privilégier des réponses spécifiques et factuelles
- Garantir la cohérence et la précision des informations
`;

  const url = `https://api.openai.com/v1/chat/completions`;

  const requestData = {
    model: model,
    messages: [
      { role: "developer", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    max_tokens: 8192,
    temperature: 0.5,
    top_p: 0.7,
  };

  const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<any> => {
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
    console.log('API Key:', API_KEY); // Log the API key to verify it
    const result = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    const jsonResponse = result.choices[0]?.message.content;
    const match = jsonResponse.match(/{[\s\S]*}/);
    if (match) {
      return JSON.parse(match[0]).quiz;
    } else {
      throw new Error('Aucun JSON valide trouvé dans la réponse');
    }
  } catch (err: any) {
    console.error('Error fetching quiz data:', err);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des données du quiz',
      data: err.message,
    });
  }
});