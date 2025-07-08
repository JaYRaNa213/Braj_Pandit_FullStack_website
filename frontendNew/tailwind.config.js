// 🔐 Tailwind Config by ChatGPT © 2025 - Jay Rana's Platform
import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode via class strategy

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#6B21A8',       // Purple
        secondary: '#10B981',     // Emerald
        gold: '#FBBF24',          // Golden yellow
        darkBg: '#1a1a1a',        // Deep dark background
        lightBg: '#fffbe6',       // Soft off-white background
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],                // Body text
        heading: ['Merriweather', 'serif'],           // Section titles, large text
      },
    },
  },

  plugins: [
    forms,
    scrollbar,
    aspectRatio,

    // 🧩 Custom Utilities for Advanced UI
    function ({ addUtilities }) {
      addUtilities({
        // Hide native scrollbars
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },

        // 3D Transform Support
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
