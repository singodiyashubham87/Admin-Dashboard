/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: 'Poppins',
      },
      screens: {
        'vsm': '406px',
        'vvsm': '100px',
      },
    },
  },
  plugins: [],
}