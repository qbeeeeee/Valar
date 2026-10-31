import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "#000000", // Pure White - Clean background
        second: "#FFFFFF", // Pure Black - Sharp text and borders
        third: "#FF3366", // Punchy Rose - Primary action color
        fourth: "#F3F4F6", // Gray 100 - Subtle shading for cards/sections
      },
    },
  },
  plugins: [],
};

export default config;
