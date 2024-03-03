import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    colors: {
      "background": "#1e1e1e",
      "accent": "#4b196f",
      "background-light": "#2f2f2f",
      "grey": "#505050",
      "white": '#ffffff'
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
