/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fc',
          100: '#e1ecf8',
          200: '#c2d8f2',
          300: '#94bde9',
          400: '#5f9bdd',
          500: '#387bce',
          600: '#2660b3',
          700: '#1e4c92',
          800: '#1a4179',
          900: '#0B2545',
          950: '#06162a',
        },
        teal: {
          50: '#f0fdfc',
          100: '#ccfbf7',
          200: '#99f6ee',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0E9F9A',
          700: '#0d7677',
          800: '#115e5f',
          900: '#134e4f',
        },
        surface: {
          DEFAULT: '#F5F7FA',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 4px 6px -1px rgba(11, 37, 69, 0.05), 0 2px 4px -1px rgba(11, 37, 69, 0.03)',
        cardHover: '0 10px 15px -3px rgba(11, 37, 69, 0.08), 0 4px 6px -2px rgba(11, 37, 69, 0.04)',
      }
    },
  },
  plugins: [],
}
