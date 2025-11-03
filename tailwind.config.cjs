/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기본 색상
        navy: "#111827", // 이전의 var(--navy)
        gray: {
          5: "#757575", // 이전의 var(--gray-5)
          6: "#4a4a4a", // 이전의 var(--gray-6)
        },
      },
    },
  },
  plugins: [],
};
