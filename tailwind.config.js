/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // seu caminho dos arquivos
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E2A249',
        secondary: '#E5848D',
        selectionLight: '#F6CFC7',
        success: '#9EC5AE',
        hoverSucesso: '#85a790',
        background: '#FFFFFF',
        backgroundExtra: '#E1D5BF',
        text: '#222222',
        textSuave: '#9CA3AF',
      },
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
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
