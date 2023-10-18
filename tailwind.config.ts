import type { Config } from 'tailwindcss'
const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif']
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        width: "width",
        height: "height",
        scale: "scale",
        'max-height': "max-height",
      },
      colors: {
        transparent: 'transparent',
        white: 'white',
        black: 'black',
        'pnk': {
          100: '#C00480',
          200: '#FF00A8',
        }
      }
    },
    
  },
  plugins: [require("tailwindcss-hyphens")],
}
export default config


