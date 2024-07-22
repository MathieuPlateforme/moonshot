// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,jsx,ts,tsx,css}'],
  darkMode: 'media',
  theme: {
    colors: {
      'green': '#0AD944',
      'background': '#1A1A1A',
      'text': '#FFFFFF',
      'text-secondary': '#B3B3B3',
      'border': '#333333',
      'border-secondary': '#4F4F4F',
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#FF0000',
      'blue': '#0000FF',
      'yellow': '#FFFF00',
      'gray': '#808080',
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
      'mono': ['"Fira Code"', 'monospace'],
    },

    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      borderColor: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}