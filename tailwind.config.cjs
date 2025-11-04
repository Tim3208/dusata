/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          100: "FFAEF2",
          90: "FFCBFA",
          80: "FAD5F2",
        },
        yellow: {
          100: "FFEE8E",
        },
        bg: {
          primary: "FBF8F1",
        },
        brown: {
          100: "2B1E1C",
          80: "7C6F61",
        },
        navy: "#111827", //footer 배경색
        gray: {
          5: "#757575",
          6: "#4a4a4a",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
