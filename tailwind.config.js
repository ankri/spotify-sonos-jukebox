module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: "#1DB954",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
