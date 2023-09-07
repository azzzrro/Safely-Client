/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        golden:"#F6F3CC",
        themeBlue:"#091F5B",
        background:"#EEEFF3"
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    darkTheme: "light",
   },
})



