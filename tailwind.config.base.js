/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        tving: {
          red: '#FF153C',
          dark: '#000000',
          gray: {
            100: '#F7F7F7',
            200: '#E5E5E5',
            300: '#B3B3B3',
            400: '#808080',
            500: '#4D4D4D',
            600: '#333333',
            700: '#1A1A1A',
            800: '#0D0D0D',
          }
        }
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}