/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    screens: {
      'sm': '768px'
    },
    fontSize: {
      //header
      h2: '60px',
      h3: '48px',
      h4: '34px',
      h5: '24px',
      h6: '20px',
      //subtitle
      st_lg: '16px', 
      st_sm: '14px',
      //body
      bd_lg: '16px',
      bd_sm: '14px',
      //button
      btn: '14px',
      //caption
      cpt: '14px',
      //overline
      ovr: '10px'
    },
    gridTemplateColumns: {
      //staff list
      'staff': '2fr 4fr'
    },
    extend: {},
  },
  plugins: [],
}
