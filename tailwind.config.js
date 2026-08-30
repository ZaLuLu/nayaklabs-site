/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c1': '#000000',      // black — primary dark
        'c2': '#FFFFFF',      // white — primary light
        'c3': '#888888',      // mid-grey — secondary/muted
        'c4': '#E5E5E5',      // light-grey — backgrounds/dividers
      },
      fontFamily: {
        'display': ['Clash Display', 'sans-serif'],
        'body': ['General Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 12vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'section': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
