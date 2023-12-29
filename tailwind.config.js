/** @type {import('tailwindcss').Config} */
// tailwind.config.js
import { nextui } from "@nextui-org/react";

export default {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

