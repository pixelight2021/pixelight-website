/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  important: true,
  theme: {
    screens: {
      'sm': '768px'
    },
    extend: {
      spacing: {
        'px': '1px'
      },
      fontSize: {
        //header
        h2: '60px',
        h3: '48px',
        h4: '34px',
        h5: '24px',
        h6: '20px',
        //subtitle
        'st-lg': '16px',
        'st-sm': '14px',
        //body
        'bg-lg': '16px',
        'bd-sm': '14px',
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
    },
  },
  plugins: [],
}
