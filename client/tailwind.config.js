/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          dark: '#0A0E17',
          card: '#111827',
          border: '#1F2937',
          accent: '#0070BA', // PayPal Blue
          gold: '#FFC439',   // PayPal Gold
          success: '#10B981',
          danger: '#EF4444'
        }
      }
    },
  },
  plugins: [],
}

