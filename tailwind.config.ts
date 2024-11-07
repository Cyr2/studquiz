import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "blue-dark": {
          "dark": "#1b2428",
          "light": "#4b4b4b"
        },
        "green": {
          "base": "#58cc02",
          "light": "#89e219"
        },
        "blue": "#1e97d4"
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
