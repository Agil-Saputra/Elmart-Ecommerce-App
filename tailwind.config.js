/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary" : '#39C6A5',
      },
      screens: {
        "xs" : '0px',
        "ms" : '305px',
        "xmd" : '860px',
        "mlg" : '1295px'
      },
    },
  },
  plugins: [],
}
