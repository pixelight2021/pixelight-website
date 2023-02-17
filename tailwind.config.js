/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  // important: true,
  theme: {
    fontFamily: {
      'status-code': 'Oswald'
    },
    extend: {
      colors: {
        'bg': '#F5F5F5',
        'bg-dark': '#292929',
        'theme-red': '#E16033',
        'theme-pink': '#FFBABD',
        'theme-yellow': '#FCFF00',
        'theme-green': '#B4E487',
        'theme-cyan': '#46FFF4',
        'theme-blue': '#6CA1F7',
        'secondary': '#D4D4D4',
        'secondary-dark': '#888'
      },
      spacing: {
        'page-padding-sm': '24px',
        'page-padding-md': '36px',
        'page-padding-xl': '160px'
      },
      fontSize: {
        h1: '64px',
        h2: '60px',
        h3: '48px',
        h4: '34px',
        h5: '24px',
        h6: '20px',
        //subtitle
        'stl-lg': '16px',
        'stl-sm': '14px',
        //body
        'bdy-lg': '16px',
        'bdy-sm': '14px',
        //button
        btn: '14px',
        //caption
        cpt: '14px',
        //overline
        ovr: '10px'
      },
      padding: {
        'page': '0 24px'
      },
      gridTemplateColumns: {
        'input': '1fr 5fr',
        //staff list
        'staff': '2fr 4fr'
      },
      scale: {
        '600': '6'
      }
    },
  },
  plugins: [],
}
