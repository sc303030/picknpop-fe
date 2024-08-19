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
      gridTemplateColumns: {
        'container': '2.5fr 7fr 3fr',
      },
      boxShadow: {
        'header': '0px 1px 0px rgb(234, 234, 237)',
      },
      screens: {
        '1160': '1160px',
      },
    },
  },
  plugins: [],
};
export default config;
