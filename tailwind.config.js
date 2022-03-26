module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif"],
      serif: ["DM Serif Text", "ui-serif"],
      mono: ["SFMono-Regular", "ui-monospace"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    extend: {},
  },
  plugins: [],
}
