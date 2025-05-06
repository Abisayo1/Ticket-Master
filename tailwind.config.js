/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // 👈 includes root HTML
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 includes all component files
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'spin-reverse': 'spin-reverse 1.5s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
    },

    screens: {
      'tablet': {'min': '300px', 'max': '768px'}, // 👈 custom tablet range
    },

  },
  plugins: [],
}

}



