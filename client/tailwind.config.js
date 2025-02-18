/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00DC82',
          dark: '#00b368',
          light: '#33FFB0',
        },
        dark: {
          lighter: '#2D2D2D',
          light: '#1F1F1F',
          DEFAULT: '#171717',
          dark: '#0F0F0F',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #00DC82, #33FFB0)',
        'gradient-dark': 'linear-gradient(to right, #171717, #2D2D2D)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}