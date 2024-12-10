import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isChristmasTheme: false,
  }),
  actions: {
    initializeTheme() {
      if (typeof window !== 'undefined') {
        const storedThemeSetting = localStorage.getItem('isChristmasTheme');
        this.isChristmasTheme = storedThemeSetting !== null ? JSON.parse(storedThemeSetting) : false;
      }
    },
    toggleTheme() {
      this.isChristmasTheme = !this.isChristmasTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isChristmasTheme', JSON.stringify(this.isChristmasTheme));
      }
    },
  },
});