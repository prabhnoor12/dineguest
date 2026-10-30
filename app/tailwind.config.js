/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          550: '#059669',
        },
        slate: {
          850: '#151e2e',
          900: '#0f172a',
          950: '#080d1a',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
