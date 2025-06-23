/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E2A249',
        secondary: '#E5848D',
        selection: '#F6CFC7',
        success: '#9EC5AE',
        background: '#FFFFFF',
        backgroundAlt: '#E1D5BF',
        text: '#222222',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: ['36px', { lineHeight: '47px', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '39px', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '28px', fontWeight: '600' }],
        body: ['20px', { lineHeight: '30px', fontWeight: '400' }],
        small: ['12px', { lineHeight: '17px', fontWeight: '400' }],
        button: ['14px', { lineHeight: '18px', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};