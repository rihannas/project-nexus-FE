/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#FF6B35',
          red: '#E63946',
          yellow: '#FFBA08',
        },
        secondary: {
          brown: '#8B4513',
          beige: '#F5E6D3',
          gold: '#FFD700',
        },
        accent: {
          coral: '#FF7F50',
          turquoise: '#40E0D0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
