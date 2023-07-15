/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        timer: {
          '100%': {
            transform: 'rotate(-180deg)'
          }
        }
      },
      animation: {
        timer: 'timer 5s linear both'
      }
    },
  },
  plugins: [],
}

