/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}', // Optional for deeper folders
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B21A8',
        secondary: '#10B981',
        gold: '#FBBF24',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // ✅ Add here (inside array)
  ],
}
