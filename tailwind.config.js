/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9f0',
          100: '#ccf2e0',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#229954',
        },
        accent: {
          50: '#fdeee8',
          100: '#fbddd1',
          500: '#E74C3C',
          600: '#C0392B',
        },
        orange: {
          500: '#F39C12',
          600: '#D68910',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-success': 'pulse-success 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        'pulse-success': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}