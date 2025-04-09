/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // 👈 includes root HTML
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 includes all component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
