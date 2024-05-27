/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset-green': 'inset 5px 0px #2B6E36'
      },
      colors: {
        'primary-green100': '#daf1de',
        'primary-green200': '#91d49c',
        'primary-green300': '#48B75A',
        'primary-green400': '#2b6e36',
        'primary-green500': '#0e2512',
        'alt-purple100': '#e7ddee',
        'alt-purple200': '#b69acb',
        'alt-purple300': '#8656a9',
        'alt-purple400': '#503465',
        'alt-purple500': '#1b1122',
        'gray100': '#F8FFF8',
        'gray200': '#b3b3b3',
        'gray300': '#808080',
        'gray400': '#4d4d4d',
        'gray500': '#1a1a1a',
        'errorRed': '#CA1B1B',
        'successBlue': '#1B70CA',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mavenPro': ['Maven Pro', 'sans-serif']
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        rotateAndInvert: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg) scaleY(-1)' }
        }
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        rotateAndInvert: 'rotateAndInvert 0.5s forwards'
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}