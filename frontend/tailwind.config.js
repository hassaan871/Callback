/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1417',
        'bg-elevated': '#161D21',
        'bg-elevated-2': '#1B2327',
        border: '#263239',
        'border-soft': '#1E282D',
        text: '#E7EDEA',
        'text-muted': '#8FA39C',
        'text-dim': '#5E6E6A',
        accent: '#E8A33D',
        'accent-soft': 'rgba(232, 163, 61, 0.1)',
        teal: '#4FA9A2',
        'teal-soft': 'rgba(79, 169, 162, 0.1)',
        good: '#6FCF97',
        warn: '#E8A33D',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
      },
      maxWidth: {
        maxw: '1160px',
      }
    },
  },
  plugins: [],
}
