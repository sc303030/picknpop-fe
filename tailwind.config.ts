import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./teams/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
