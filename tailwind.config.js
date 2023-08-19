/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        golden:"#F6F3CC"
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    darkTheme: "light",
   },
}



