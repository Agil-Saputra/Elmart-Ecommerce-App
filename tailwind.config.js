/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary" : '#39C6A5',
      },
      screens: {
        "xs" : '0px',
        "ms" : '305px',
        "xmd" : '860px'
      },
    },
  },
  plugins: [],
}
