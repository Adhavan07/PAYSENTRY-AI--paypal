/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        paypal: {
          navy: '#001C3F',       // PayPal Deep Executive Navy
          blue: '#003087',       // PayPal Classic Core Blue
          marine: '#0070BA',     // PayPal Vibrant Brand Blue
          sky: '#009CDE',        // PayPal Sky Blue Accent
          gold: '#FFC439',       // PayPal Iconic Gold Button
          goldHover: '#F2BA36',  // PayPal Gold Hover
          dark: '#08101E',       // PayPal Theme Background
          card: '#0D1B2A',       // PayPal Theme Card Surface
          cardHover: '#132438',  // Card Hover
          border: '#1B2F4A',     // PayPal Theme Border
          borderLight: '#2A4365',// Elevated Border
          subtext: '#8CA3BA'     // Secondary muted text
        }
      }
    },
  },
  plugins: [],
}
