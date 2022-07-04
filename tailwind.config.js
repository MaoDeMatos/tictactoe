const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      fontFamily: {
        sans: [
          // "Inter Var",
          "Josefin Sans",
          ...defaultTheme.fontFamily.sans,
        ],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.amber,
        slate: colors.slate,
        cyan: colors.cyan,
      },
    },
  },
  variants: {},
};
