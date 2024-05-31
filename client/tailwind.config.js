/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        typewriter: 'typewriter 5s steps(1000) forwards',
        caret: 'typewriter 5s steps(1000) forwards, steps(1000) infinite 2s ',
        
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        
        
      },
    },
    screens: {
      'sm': '0px',
      // => @media (min-width: 576px) { ... }

      'md': '640px',
      // => @media (min-width: 960px) { ... }

      'lg': '1391px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
