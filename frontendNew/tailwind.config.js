// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
    forms,
    scrollbar,

    // 🧩 Custom utilities for scrollbar, 3D transforms, perspective, backface visibility
    function ({ addUtilities }) {
      addUtilities({
        // Hide native scrollbars
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none',    // Firefox
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',              // Chrome, Safari
        },

        // Perspective for 3D scenes
        '.perspective-1000': {
          perspective: '1000px',
        },

        // Enable child elements to retain 3D transforms
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },

        // Hide back face of an element during flip
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    },
  ],
};
