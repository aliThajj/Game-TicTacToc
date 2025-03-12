/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      screens: {
        'sm': '300px', // This will NOT override the default `sm` breakpoint
      },
    },
  },
  plugins: [],
}