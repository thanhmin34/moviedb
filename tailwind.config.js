module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: ["Roboto", "sans-serif"],
      colors: {
        primary: "#0d90f3",
        basic: "#27282e",
      },
      screens: {
        min: { max: "340px" },
        mobiS: { max: "520px" },
        s: { max: "639px" },
        sm: "640px",
        m: { max: "767px" },
        md: "768px",
        l: { max: "1023px" },
        lg: "1024px",
        xl: { max: "1279px" },
        xlmin: { min: "1280px" },
        "2xl": { max: "1360px" },
        xlmin: "1279px",
        "3xl": { max: "1436px" },
        "3xlmin": "1360px",
        "4xl": { max: "1536px" },
        "4xlmin": "1360px",
        "4x": { min: "1404px" },
      },
    },
  },
  plugins: [],
};
