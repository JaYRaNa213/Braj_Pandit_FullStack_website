import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      boxShadow: {
      glow: "0 0 8px 2px rgba(255,255,255,0.6)",
    },
      colors: {
        primary: '#6B21A8',       // Purple
        secondary: '#10B981',     // Emerald
        gold: '#FBBF24',          // Golden yellow
        darkBg: '#1a1a1a',        // Deep dark background
        lightBg: '#fffbe6',       // Soft off-white background
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],                // Body text
        heading: ['Merriweather', 'serif'],           // Section titles
      },

      animation: {
        marquee: 'marquee 15s linear infinite',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(300%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },

  plugins: [
    forms,
    scrollbar,
    aspectRatio,

    // 🧩 Custom Utilities
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    },
  ],
};
