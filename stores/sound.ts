import { defineStore } from 'pinia';

export const useSoundStore = defineStore('sound', {
  state: () => ({
    isSoundOn: true,
  }),
  actions: {
    initializeSound() {
      if (typeof window !== 'undefined') {
        const storedSoundSetting = localStorage.getItem('isSoundOn');
        this.isSoundOn = storedSoundSetting !== null ? JSON.parse(storedSoundSetting) : true;
      }
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isSoundOn', JSON.stringify(this.isSoundOn));
      }
    },
  },
});
