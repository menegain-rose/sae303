/** @type {import('tailwindcss').Config} */
const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'imageaccueil': "url('public/images/homepage.jpg')",
      }),

      colors: {
        "MainGreen": "#234620",
        "LightGreen": "#3E6E3A",
        "MediumBeige": "#CBC7BE",
        "MediumGray": "#4F4D4A",
        "DarkGray": "#232221"
      },
      fontSize: {
        "xs": "0.875",
        "sm": "0.625rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.375rem",
        "xls": "1.563",
        "big": "1.75"
      },
      fontFamily: {
        "raleway": ['Raleway', 'sans-serif'],
        "athiti": ['Athiti', 'sans-serif']
      },
      borderRadius: {
        "none": "0",
        "xs": "0.313rem",
        "sm": "0.625rem",
        "base": "0.938rem",
        "lg": "1.25rem",
        "xl": "1.563rem",
      },
      animation: {
      }
    },
  },
  plugins: [],
}
);