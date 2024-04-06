import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        phone: "320px",
        mobileLandscape: "480px",
        SmallTabletPortrait: "640px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
      },
      colors: {
        backgroundNav: "#0B2447",
        navTextCollor: "#176B87",
        "color-1": "#32347a",
        "color-2": "#d9c7dc",
        "color-3": "#3d6ce4",
        "color-4": "#84bbe4",
        "color-5": "#0c0f1a",
      },
      direction: {
        rtl: "rtl",
      },
      gridAutoFlow: {
        col: "column",
      },
    },
  },
  plugins: [],
};
export default config;
