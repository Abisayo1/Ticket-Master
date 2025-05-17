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
          "slide-up": "slideUp 0.3s ease-out forwards",
           "slide-down": "slideDown 0.3s ease-out forwards",
            "slide-down-exit": "slideDownExit 0.3s ease forwards",
             "slide-down-exit": "slideDownExit 0.3s ease forwards",
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },

           slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },

           slideDown: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },

          slideDownExit: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },

           slideDownExit: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },  // slide down off screen
        },
    },

    screens: {
      'tablet': {'min': '100px', 'max': '768px'}, // 👈 custom tablet range
    },

  },
  plugins: [require('tailwind-scrollbar-hide')],

}



}




