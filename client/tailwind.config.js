/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E50914', // Netflix Red
        secondary: '#000000',
        accent: '#54B435'
      }
    },
  },
  plugins: [],
}
