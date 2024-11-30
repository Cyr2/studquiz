import { defineStore } from 'pinia';

export const useLogin = defineStore('login', {
  state: () => ({
    logged: false,
  }),
  actions: {
    initializeLogin() {
      if (typeof window !== 'undefined') {
        const storedLoginStatus = localStorage.getItem('logged');
        this.logged = storedLoginStatus !== null ? JSON.parse(storedLoginStatus) : false;
      }
    },
    setLogged(data: boolean) {
      this.logged = data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('logged', JSON.stringify(this.logged));
      }
    },
  },
});
