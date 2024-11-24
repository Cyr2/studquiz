import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "hive-yellow": "#FFC300",
        "buzz-orange": "#FF9600",
        "bee-black": "#333333",
        "pollen-white": "#FFFFFF",
        "honeycomb-gold": "#D99E30",
        "spring-green": "#A8D080",
        "nectar-red": "#FF6F61",
        "wax-gray": "#4B4B4B",
        "cloud-white": "#F7F7F7",
        "driftwood-beige": "#E5E5E5",
        "sucess": "#6cbf6c"
      },
      boxShadow: {
        'defaultBtn': '0 .375rem #FF9600',
        'defaultBtnHover': '0 0 #FF9600',
        'defaultInput': '0 .25rem #4B4B4B',
        'defaultInputHover': '0 0 #4B4B4B',
      },
    },
  },
};
