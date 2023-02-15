/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#272c35",
        primary: {
          full: "#c6535c",
          hover: "#bf404a",
        },
        fg: {
          default: "#c9d1d9",
          muted: "#768390",
        },
        neutral: {
          muted: "#6e768166",
        },
        border: {
          muted: "#373E47",
        },
        link: "#",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};