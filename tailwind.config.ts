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
        'container': 'minmax(224px, 1fr) minmax(660px, 3fr) minmax(250px, 1fr)',
      },
      boxShadow: {
        'header': '0px 1px 0px rgb(234, 234, 237)',
      },
      screens: {
        '1160': '1160px',
        '660' : '660px'
      },
    },
  },
  plugins: [],
};
export default config;
