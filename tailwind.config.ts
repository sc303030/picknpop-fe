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
        'custom': '1340px',
      },
      gridTemplateColumns: {
        'container': 'minmax(200px, 1fr) 3fr minmax(200px, 1fr)',
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
