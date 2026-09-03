/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Outfit"', 'sans-serif'],
        'body': ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'accent-red': '#E2001A',
        'accent-emerald': '#00F5A0',
        'accent-amber': '#FFB800',
        'accent-cyan': '#00D2FF',
      },
      fontSize: {
        'hero': ['clamp(3.4rem, 8.5vw, 6.8rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'section-h': ['clamp(2.0rem, 4.2vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'card-h': ['clamp(1.25rem, 2.0vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
