const { heroui } = require('@heroui/react')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif'],
      serif: ['DM Serif Text', 'ui-serif'],
      mono: ['SFMono-Regular', 'ui-monospace'],
      display: ['Oswald'],
      body: ['Open Sans'],
    },
    extend: {
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [
    heroui({
      prefix: 'heroui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light', // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: { DEFAULT: '#FBBF24', foreground: '#11181C' },
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: { DEFAULT: '#F59E0B', foreground: '#11181C' }, // dark theme colors
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}
