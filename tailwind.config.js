const { heroui, code } = require('@heroui/react')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'ui-sans-serif'],
      heading: ['var(--font-heading)', 'ui-sans-serif'],
      logo: ['var(--font-logo)', 'ui-sans-serif'],
    },
    extend: {
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        sm: ['1rem', { lineHeight: '1.5rem' }], // 16px
        base: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        lg: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        xl: ['1.375rem', { lineHeight: '2rem' }], // 22px
        '2xl': ['1.625rem', { lineHeight: '2.125rem' }], // 26px
        '3xl': ['2rem', { lineHeight: '2.375rem' }], // 32px
        '4xl': ['2.375rem', { lineHeight: '2.625rem' }], // 38px
        '5xl': ['3.125rem', { lineHeight: '1' }], // 50px
        '6xl': ['3.875rem', { lineHeight: '1' }], // 62px
        '7xl': ['4.625rem', { lineHeight: '1' }], // 74px
        '8xl': ['6.125rem', { lineHeight: '1' }], // 98px
        '9xl': ['8.125rem', { lineHeight: '1' }], // 130px
      },
      screens: {
        xs: '420px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '1024px',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            p: {
              fontWeight: '500',
            },
            li: {
              fontWeight: '500',
            },
            ul: {
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    heroui({
      prefix: 'heroui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light', // default theme to extend on custom themes
      layout: {
        borderWidth: {
          small: '1px', // border-small
          medium: '1px', // border-medium
          large: '2px', // border-large
        },
      }, // common layout tokens (applied to all themes)
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
