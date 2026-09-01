/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Clash Display', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
        'serif': ['"Instrument Serif"', 'Georgia', 'serif'],
        'body': ['General Sans', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'c1': '#000000',      // black — primary dark
        'c2': '#FFFFFF',      // white — primary light
        'c3': '#888888',      // mid-grey — secondary/muted
        'c4': '#E5E5E5',      // light-grey — backgrounds/dividers
        'accent-red': '#E2001A',
        'accent-emerald': '#00F5A0',
        'accent-amber': '#FFB800',
        'accent-cyan': '#00D2FF',
      },
      fontSize: {
        'hero': ['clamp(2.4rem, 4.8vw, 4.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'section': ['clamp(1.85rem, 3.4vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
