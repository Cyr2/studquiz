export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizData: [],
  }),
  actions: {
    setQuizData(data) {
      this.quizData = data;
    },
  },
});
