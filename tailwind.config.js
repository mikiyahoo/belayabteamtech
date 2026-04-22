/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        welfare: ['Welfare', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#e65225',
        secondary: '#343333',
        softgrey: '#F8F9FA',
        deepnight: '#1A1A1A',
      },
        container: {
        center: true,
        padding: '1rem',
      //fontFamily: {
       // heading: ['Welfare', 'sans-serif'],
       // body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}