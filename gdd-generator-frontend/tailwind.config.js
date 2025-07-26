// tailwind.config.js

    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Esta linha já configura o Tailwind para olhar seus arquivos React
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
