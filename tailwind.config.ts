import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./teams/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
export default config;
