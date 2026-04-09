/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        impact: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
      colors: {
        primary: '#A78BFA',
        'primary-light': '#C4B5FD',
        accent: '#F59E0B',
        'accent-light': '#FBBF24',
        dark: '#1b1b1b',
        'dark-lighter': '#212529',
        'gray-custom': '#c8c8d8',
        'primary-transparent': '#A78BFA1A',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(167, 139, 250, 0.15)',
        'glow': '0 0 25px -5px rgba(167, 139, 250, 0.15)',
        'glow-lg': '0 0 35px -7px rgba(167, 139, 250, 0.2)',
        'glow-accent': '0 0 25px -5px rgba(245, 158, 11, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            fontFamily: theme('fontFamily.body'),
            h1: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.heading'),
              letterSpacing: '0.02em',
              lineHeight: '1.15',
              fontWeight: '400',
              textTransform: 'uppercase',
            },
            h2: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.heading'),
              letterSpacing: '0.02em',
              lineHeight: '1.15',
              fontWeight: '400',
              textTransform: 'uppercase',
            },
            h3: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.heading'),
              letterSpacing: '0.02em',
              lineHeight: '1.15',
              fontWeight: '400',
              textTransform: 'uppercase',
            },
            h4: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.heading'),
              letterSpacing: '0.02em',
              lineHeight: '1.2',
              fontWeight: '400',
              textTransform: 'uppercase',
            },
            p: {
              fontFamily: theme('fontFamily.body'),
              lineHeight: '1.7',
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            code: {
              color: theme('colors.primary'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.800'),
              fontFamily: theme('fontFamily.heading'),
              fontStyle: 'normal',
              fontWeight: '400',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};