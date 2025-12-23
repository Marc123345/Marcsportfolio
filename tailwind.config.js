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
        asen: ['Asen Pro', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        // Using Roboto as the sleek default for B2B authority
        sans: ['Roboto', 'sans-serif'], 
      },
      colors: {
        primary: {
          DEFAULT: '#A3D1FF',
          dark: '#92bce6',
          transparent: 'rgba(163, 209, 255, 0.1)',
        },
        dark: {
          DEFAULT: '#000000',
          lighter: '#1b1b1b',
          card: '#0a0a0a', // Deeper black for high-end cards
        },
        gray: {
          custom: '#9CA3AF',
          muted: '#6B7280',
        },
      },
      // Premium easing for Framer Motion and CSS transitions
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'subtle-float': 'float 6s ease-in-out infinite',
      },
      letterSpacing: {
        'tighter': '-0.04em', // High-end agency look for H1s
        'tight': '-0.02em',
        'widest': '0.3em',    // For small uppercase labels
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(163, 209, 255, 0.1)',
        'glow': '0 0 40px -10px rgba(163, 209, 255, 0.15)', // Refined glow
        'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)', // Inner border for glass
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.400'),
            maxWidth: '65ch', // Optimized for readability
            h1: {
              color: theme('colors.white'),
              fontWeight: '900',
              letterSpacing: theme('letterSpacing.tighter'),
              lineHeight: '0.9',
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: '900',
              letterSpacing: theme('letterSpacing.tighter'),
              lineHeight: '1.0',
            },
            strong: { color: theme('colors.white') },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'none',
              borderBottom: `1px solid transparent`,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderBottomColor: theme('colors.primary.DEFAULT'),
              },
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.primary.DEFAULT'),
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '1.25rem',
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