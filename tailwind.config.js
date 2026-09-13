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
          DEFAULT: '#E09900',
          hover: '#F5B027',
          light: '#FFF5E5',
          dark: '#B37A00',
          muted: 'rgba(224, 153, 0, 0.16)',
          border: '#C9A227'
        },
        obsidian: {
          950: '#060B10',
          900: '#0B1219',
          850: '#101923',
          800: '#162230',
          700: '#1F2F42',
          600: '#2A3F58'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
