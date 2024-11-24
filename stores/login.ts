export const useLogin = defineStore('login', {
  state: () => ({
    logged: false,
  }),
  actions: {
    setLogged(data: boolean) {
      this.logged = data;
    },
  },
});
