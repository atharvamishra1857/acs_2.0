import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF5A00",
          dark: "#111111",
          gray: "#2D2D2D",
          light: "#F4F4F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
};

export default config;