/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "rgb(var(--black) / <alpha-value>)",
        white: "rgb(var(--white) / <alpha-value>)",
        gray: "rgb(var(--gray) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
