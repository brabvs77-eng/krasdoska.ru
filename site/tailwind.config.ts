import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#252330",
          dark: "#18110D",
          light: "#111111",
        },
        accent: {
          DEFAULT: "#FE772B",
          dark: "#E5651A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F7F3",
          dark: "#111111",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
