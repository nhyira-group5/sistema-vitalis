/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors:{
      'primary-green100': '#daf1de',
      'primary-green200': '#91d49c',
      'primary-green300': '#48b75a',
      'primary-green400': '#2b6e36',
      'primary-green500': '#0e2512',
      'alt-purple100': '#e7ddee',
      'alt-purple200': '#b69acb',
      'alt-purple300': '#8656a9',
      'alt-purple400': '#503465',
      'alt-purple500': '#1b1122',
      'black100': '#e6e6e6',
      'black200': '#b3b3b3',
      'black300': '#808080',
      'black400': '#4d4d4d',
      'black500': '#1a1a1a',
      'white': '#F8FFF8'
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'mavenPro': ['Maven Pro', 'sans-serif']
    }
  },
  plugins: [],
}

