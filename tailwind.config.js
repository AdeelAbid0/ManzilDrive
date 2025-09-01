module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00796B",
        primarygrey: "#6383A6",
        primaryblue: "#00417A",
        secondary: "#001326",
        placeholder: "#57756E",
        input: "#666666",
        search: "#004F95",
        gradient: "#001F3F",
        error: "#B3261E",
      },
      backgroundImage: {
        hero: `
          linear-gradient(0deg, #001F3F, #001F3F),
          linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))
        `,
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },

      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out forwards",
        "slide-out": "slide-out 0.3s ease-in forwards",
      },
    },
  },

  plugins: [],
};
