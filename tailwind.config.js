import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--geist-primary)",
          400: "var(--geist-primary-400)",
          500: "var(--geist-primary-500)",
          600: "var(--geist-primary-600)",
          700: "var(--geist-primary-700)",
          800: "var(--geist-primary-800)",
          900: "var(--geist-primary-900)",
          950: "var(--geist-primary-950)",
          foreground: "var(--geist-foreground)",
          background: "var(--geist-background)",
        },
        secondary: {
          DEFAULT: "var(--geist-secondary)",
          foreground: "var(--geist-foreground)",
          background: "var(--geist-background)",
        },
        accent: {
          DEFAULT: "var(--geist-accent)",
          foreground: "var(--geist-foreground)",
          background: "var(--geist-background)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
