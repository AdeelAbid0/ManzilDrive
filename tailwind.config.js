module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00796B",
        primarygrey: "#6383A6",
        primaryblue: "#00417A",
        secondary: "#001326",
        placeholder: "#4D4D4D",
        search: "#004F95",
        gradient: "#001F3F",
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
        archivo: ["Archivo", "sams-serif"],
      },
    },
  },
  plugins: [],
};
