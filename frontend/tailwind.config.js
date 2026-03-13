/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  // 1. AÑADIMOS ESTA LÍNEA PARA QUE LAS CLASES 'dark:...' DE TAILWIND FUNCIONEN
  darkMode: 'class', 
  
  theme: {
    extend: {
      colors: {
        jungle_teal: '#00A388',
        // Si vas a usar los colores de tu paleta (lemon_lime, sea_green, etc.)
        // deberías añadirlos aquí también para que Tailwind los reconozca.
        // Ejemplo:
        // 'sea_green-400': 'var(--color-sea_green-400)',
        // 'lemon_lime-400': 'var(--color-lemon_lime-400)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dark", 
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#00A388",
          "base-100": "#FDFCF8",
          "base-200": "#F1F5F9",
          "base-content": "#1F2937",
        },
      },
    ],
  },
}