/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          indigo: {
            500: '#5c6ac4',
            600: '#4a5568',
            // Add other variants as needed
          },
          white: "#ffffff",
          background: '#1a1a1a',
          text: '#ffffff',
        },
        dark: {
          indigo: {
            500: '#7c3aed',
            600: '#6d28d9',
            // Add other variants as needed
          },
          white: "#0e7490",
          background: '#ffffff',
          text: '#333333',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
