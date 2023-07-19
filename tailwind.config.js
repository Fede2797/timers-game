/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'yellow': '#FFC900',
        'green': '#23A094',
        'blue': '#90A8ED',
        'orange': '#FF7051',
        'pink': '#FF90E8',
        'red': '#E8442C',
      },
      fontFamily: {
        'jost': 'Jost',
      },
      keyframes: {
        timer: {
          '100%': {
            transform: 'rotate(-180deg)'
          }
        }
      }
    },
  },
  plugins: [],
}

