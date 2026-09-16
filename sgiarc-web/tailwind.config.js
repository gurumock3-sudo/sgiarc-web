/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: '#E6E6FA',
          ivory: '#FFFFF0',
          beige: '#F5F5DC',
          charcoal: '#36454F',
          navy: '#000080',
          accent: '#7bb3e2'
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'Inter', 'sans-serif'],
        heading: ['Oswald', 'sans-serif']
      }
    },
  },
  plugins: [],
}
