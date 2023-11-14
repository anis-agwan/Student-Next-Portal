/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "binghamton-green": "#005941",
        "auth-grey": "#818181",
      },
      backgroundImage: {
        endScreen: "url('./Quiz/EndScreen/DSCN5677.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      blur: {
        xs: "3px",
      },
      backdropBlur: {
        xs: "3px",
      },
    },
  },
  plugins: [],
};
