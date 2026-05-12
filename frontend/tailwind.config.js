/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: "#FF9900",
          blue: "#146EB4",
          dark: "#131921",
        }
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
      }
    },
  },
  plugins: [],
}
