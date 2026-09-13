/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#e09900',
          hover: '#c88800',
          light: '#fff8eb',
          dark: '#b37a00',
          muted: 'rgba(224, 153, 0, 0.16)',
          border: '#e09900'
        },
        cream: {
          DEFAULT: '#F9F7F2',
          light: '#FCFBF8',
          dark: '#F2EFE8',
          border: '#E8E4DA'
        },
        dark: {
          DEFAULT: '#1D1D1B',
          pure: '#000000',
          surface: '#111111',
          card: '#161F2A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
