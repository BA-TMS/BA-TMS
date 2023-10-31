import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#d1e9ff',
          200: '#b2ddff',
          300: '#84caff',
          400: '#53b1fd',
          500: '#2e90fa',
          600: '#1570ef',
          700: '#175cd3',
          800: '#1849a9',
          900: '#194185',
        },
      },
    },
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
