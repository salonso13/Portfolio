import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/popover.js"
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#e9e9e9",
        darkBg: "#131424",
        circuloPoryecto: "#898989",
      },
      fontFamily: {
        TourneyReg: ["Tourney", "serif"]
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;

