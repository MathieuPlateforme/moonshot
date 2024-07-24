// tailwind.config.js

const { it } = require('vitest');

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
      'bgCustomForm': '#CFDBE8',
      'textBlueCard': '#5C59E7',
    },
    fontFamily: {
      'be-vietnam': ['"Be Vietnam Pro"', 'sans-serif'],
      'roboto': ['"Roboto"', 'sans-serif'],
    },
    fontSize: {
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '24': '24px',
      '32': '32px',
    },
    fontWeight: {
      'regular': 400,
      'bold': 700,
    },
      

    extend: {
      fontStyle: {
        italic: 'italic',
      },
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