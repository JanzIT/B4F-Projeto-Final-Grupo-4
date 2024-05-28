
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": " #070417",
        "nav-bg": "#1A1A1A",
        courseCard: "#3335A6",
        courseCardD: "#7359B7",
        mainBgGradientStart: "#070417",
        mainBgGradientMiddle: "#0B0420",
        mainBgGradientEnd: "#361768",
      },
      darkMode: "class",
      plugins: [nextui()],
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
      },
      backgroundImage: {
        'card-img': "url('/img-course1.png')",

      },
    },
  },
  plugins: [],
};
