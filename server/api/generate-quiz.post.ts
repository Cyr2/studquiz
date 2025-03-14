import { Mistral } from '@mistralai/mistralai';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { text } = body;
    const config = useRuntimeConfig();
    const apiKey = config.mistralApi;

    if (!apiKey) {
      throw new Error('Clé API Mistral non configurée');
    }

    const client = new Mistral({ apiKey });

    const prompt = `En te basant sur le texte suivant, génère un quiz avec 5 questions à choix multiples. 
    Chaque question doit avoir 4 options de réponse et une seule réponse correcte.
    Format de sortie attendu (en JSON) :
    {
      "questions": [
        {
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 0
        }
      ]
    }

    Texte à utiliser :
    ${text}`;

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const quizData = JSON.parse(chatResponse.choices[0].message.content);

    return {
      success: true,
      quiz: quizData
    };
  } catch (error) {
    console.error('Erreur génération quiz:', error);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la génération du quiz'
    });
  }
}); 