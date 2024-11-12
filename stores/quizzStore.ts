export const useQuizzStore = defineStore('quizz', {
  state: () => ({
    quizzData: [],
  }),
  actions: {
    setQuizzData(data) {
      this.quizzData = data;
    },
  },
});