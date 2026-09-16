/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stanford: {
          cardinal: '#8C1515',
          cardinalDark: '#820000',
          black: '#2E2D29',
          coolGrey: '#4D4F53',
          lightGrey: '#F4F4F4',
          sand: '#D4D1D1',
          stone: '#544948',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
        heading: ['"Source Serif 4"', 'serif']
      }
    },
  },
  plugins: [],
}
