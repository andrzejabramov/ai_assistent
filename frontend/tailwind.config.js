/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Синий
        accent: "#F97316", // Оранжевый
        bg: "#F8FAFC", // Фон
        text: "#1E293B", // Текст
      },
    },
  },
  plugins: [],
};
