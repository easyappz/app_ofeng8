/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2rem',
        },
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b3d9ff',
          300: '#85c2ff',
          400: '#53a2ff',
          500: '#2b87ff',
          600: '#216ae6',
          700: '#1b52b4',
          800: '#173f8c',
          900: '#132f6b'
        }
      }
    }
  },
  plugins: []
};
