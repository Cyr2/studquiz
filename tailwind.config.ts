import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "blue-dark": {
          "dark": "#1b2428",
          "base": "#253339",
          "light": "#4b4b4b"
        },
        "green": {
          '50': '#f3ffe4',
          '100': '#e4ffc6',
          '200': '#c9ff93',
          '300': '#a4ff55',
          '400': '#82f922',
          '500': '#58cc02',
          '600': '#48b300',
          '700': '#378803',
          '800': '#2e6b09',
          '900': '#295a0d',
          '950': '#113201',
        },
        "blue": {
          "light": "#1e97d4"
        }
      }
    },
    boxShadow: {
      'defaultBtn': ' 0 .375rem #58cc02',
      'defaultBtnHover': '0 0 #58cc02',
      'defaultInput': '0 .25rem #4b4b4b',
      'defaultInputHover': '0 0 #4b4b4b',
    }
  },
};
