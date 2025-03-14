export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizData: [],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    setQuizData(data) {
      this.quizData = data;
    },
    async generateQuizFromDocument(documentText: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: documentText,
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la génération du quiz');
        }

        const data = await response.json();
        this.setQuizData(data.quiz);
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
