/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      }
    },
  },

  darkMode: "class",

  // ❗ Do NOT load plugins here when using Tailwind v4 CSS-based plugins
  // plugins: [],
};
