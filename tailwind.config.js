/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#000000',
          'secondary': '#047857',
          'secondary-dark': '#D13D35',
          'accent': '#000000',
          'neutral': '#000000',
          'base-100': '#000000',
          'bgBreadcrumb': '#FF361F',
        },
        animation: {
          fadeIn: 'fadeIn 0.3s ease-out',
          scaleIn: 'scaleIn 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          scaleIn: {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
      },
    },
    plugins: [],
  };