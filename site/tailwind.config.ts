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
          DEFAULT: "#2D5A3D",
          dark: "#1E3D29",
          light: "#3D7A52",
        },
        accent: {
          DEFAULT: "#C4A35A",
          dark: "#A8873F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F5F0",
          dark: "#1A1A1A",
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
