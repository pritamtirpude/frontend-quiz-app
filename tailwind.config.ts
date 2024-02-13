import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          900: '#FFFFFF',
          800: '#F4F6FA',
          700: '#ABC1E1',
        },
        dark: {
          900: '#626c7F',
          800: '#3B4D66',
          700: '#313E51',
        },
        customGreen: '#26D782',
        customPurple: '#A729F5',
        customRed: '#EE5454',
      },
      backgroundImage: {
        'desktop-light-pattern': `url('../public/assets/images/pattern-background-desktop-light.svg')`,
        'desktop-dark-pattern': `url('../public/assets/images/pattern-background-desktop-dark.svg')`,
        'mobile-light-pattern': `url('../public/assets/images/pattern-background-mobile-light.svg')`,
        'mobile-dark-pattern': `url('../public/assets/images/pattern-background-mobile-dark.svg')`,
        'tablet-light-pattern': `url('../public/assets/images/pattern-background-tablet-light.svg')`,
        'tablet-dark-pattern': `url('../public/assets/images/pattern-background-tablet-dark.svg')`,
      },
    },
  },
  plugins: [],
};
export default config;
