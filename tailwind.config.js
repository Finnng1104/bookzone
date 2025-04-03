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
          'secondary': '#E0524A',
          'secondary-dark': '#D13D35',
          'accent': '#000000',
          'neutral': '#000000',
          'base-100': '#000000',
          'bgBreadcrumb': '#FF361F',
        },
      },
    },
    plugins: [],
  };