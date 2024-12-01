/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        paytone: ['Paytone One', 'sans-serif'],
        passion: ['Passion One', 'sans-serif'],
        custom: ['PressStart2P', 'sans-serif'],
        txt: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 0px 30px rgba(0, 0, 0, 0.3)',
        'now':  '4px 4px 20px rgba(0, 0, 0, 0.2)',
        'up':  '8px 8px 30px rgba(0, 0, 0, 0.2)',
      },
      fontSize: {
        'cus': '50px',
        '38px': '38px',
        '48':'48px',
        '18px': '18px',
      },
      padding:{
        'pads': '10px 30px',
        'bnow': '0px 0px 0px 30px',
      },
      margin:{
        'mar':'0px 0px 9px',
        'mtb':'100px 0px 100px 0px',
       
      },
    },
  },
  plugins: [],
};
