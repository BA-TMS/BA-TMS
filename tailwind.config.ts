import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      public: ['var(--font-publicsans)', 'sans-serif'],
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#212B36',
      primary: '#01C37A',
      'primary-light': '#80DEBC',
      'primary-dark': '#1B806A',
      secondary: '#3366FF',
      // 'secondary-light': '#',
      'secondary-dark': '#1939B7',
      'grey-100': '#F9FAFB',
      'grey-200': '#F4F6F8',
      'grey-300': '#DFE3E8',
      'grey-400': '#C4CDD5',
      'grey-500': '#919EAB',
      'grey-600': '#637381',
      'grey-700': '#454F5B',
      'grey-800': '#212B36',
      'grey-900': '#161C24',
      'info-lighter': '#CAFDF5',
      'info-light': '#61F3F3',
      info: '#00B8D9',
      'info-dark': '#006C9C',
      'info-darker': '#003768',
      'success-lighter': '#D8FBDE',
      'success-light': '#86E8AB',
      success: '#36B37E',
      'success-dark': '#1B806A',
      'success-darker': '#0A5554',
      'warning-lighter': '#FFF5CC',
      'warning-light': '#FFD666',
      warning: '#FFAB00',
      'warning-dark': '#B76E00',
      'warning-darker': '#7A4100',
      'error-lighter': '#FFE9D5',
      'error-light': '#FFAC82',
      error: '#FF5630',
      'error-dark': '#B71D18',
      'error-darker': '#7A0916',
    },

    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },

    extend: {
      fontSize: {
        'title-xxl': ['64px', '80px'],
        'title-xl': ['48px', '64px'],
        'title-lg': ['32px', '48px'],
        'title-md': ['24px', '36px'],
        'title-sm': ['20px', '30px'],
        'title-xsm': ['18px', '28px'],
        'text-xl': ['24px', '22px'],
        'text-lg': ['16px', '24px'],
        'text-sm': ['14px', '22px'],
        'text-xsm': ['12px', '18px'],
        'text-xxsm': ['10px', '10px'],
        'button-lg': ['15px', '26px'],
        'button-md': ['14px', '24px'],
        'button-sm': ['13px', '22px'],
        'table-title': ['13px', '24px'],
        'tab-label': ['12px', '20px'],
      },
      screens: {
        '2xsm': '375px',
        xsm: '425px',
        '3xl': '2000px',
      },
      spacing: {
        2.75: '0.6875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem', // 30px
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        11: '2.75rem',
        11.5: '2.875rem', // 46px
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        14.5: '3.625rem',
        15: '3.75rem',
        15.5: '3.875rem',
        16: '4rem',
        16.5: '4.125rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        18.5: '4.625rem',
        19: '4.75rem', // 76px
        19.5: '4.875rem',
        21: '5.25rem',
        21.5: '5.375rem',
        22: '5.5rem',
        22.5: '5.625rem',
        24.5: '6.125rem',
        25: '6.25rem',
        25.5: '6.375rem',
        26: '6.5rem',
        27: '6.75rem',
        27.5: '6.875rem',
        29: '7.25rem',
        29.5: '7.375rem',
        30: '7.5rem',
        31: '7.75rem',
        32.5: '8.125rem',
        33: '8.25rem',
        34: '8.5rem',
        34.5: '8.625rem',
        35: '8.75rem',
        36.5: '9.125rem',
        37.5: '9.375rem',
        39: '9.75rem',
        39.5: '9.875rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        46: '11.5rem',
        47.5: '11.875rem',
        49: '12.25rem',
        50: '12.5rem',
        52: '13rem',
        52.5: '13.125rem',
        54: '13.5rem',
        54.5: '13.625rem',
        55: '13.75rem',
        55.5: '13.875rem',
        59: '14.75rem',
        60: '15rem', // 240px
        62.5: '15.625rem',
        65: '16.25rem',
        67: '16.75rem',
        67.5: '16.875rem',
        70: '17.5rem', // 280px
        72.5: '18.125rem',
        73: '18.25rem',
        75: '18.75rem',
        90: '22.5rem',
        94: '23.5rem',
        95: '23.75rem',
        100: '25rem',
        115: '28.75rem',
        125: '31.25rem',
        132.5: '33.125rem',
        150: '37.5rem',
        171.5: '42.875rem',
        180: '45rem',
        187.5: '46.875rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem',
      },
      maxWidth: {
        2.5: '0.625rem',
        3: '0.75rem',
        4: '1rem',
        7: '1.75rem',
        9: '2.25rem',
        10: '2.5rem',
        10.5: '2.625rem',
        11: '2.75rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        22.5: '5.625rem',
        25: '6.25rem',
        30: '7.5rem',
        34: '8.5rem',
        35: '8.75rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        60: '15rem',
        70: '17.5rem',
        90: '22.5rem',
        94: '23.5rem',
        125: '31.25rem',
        132.5: '33.125rem',
        142.5: '35.625rem',
        150: '37.5rem',
        180: '45rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem',
        270: '67.5rem',
        280: '70rem',
        292.5: '73.125rem',
      },
      maxHeight: {
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
        550: '34.375rem',
        300: '18.75rem',
      },
      minWidth: {
        22.5: '5.625rem',
        42.5: '10.625rem',
        47.5: '11.875rem',
        75: '18.75rem',
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      opacity: {
        16: '.16',
        65: '.65',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")',
      },
      transitionProperty: { width: 'width', stroke: 'stroke' },
      borderWidth: {
        6: '6px',
        10: '10px',
        12: '12px',
      },
      boxShadow: {
        'hover-primary': '0px 8px 16px 0px rgba(27, 128, 106, 0.24)',
        'hover-info': '0px 8px 16px 0px rgba(0, 108, 156, 0.24)',
        'hover-success': '0px 8px 16px 0px rgba(27, 128, 106, 0.24)',
        'hover-warning': '0px 8px 16px 0px rgba(183, 110, 0, 0.24)',
        'hover-error': '0px 8px 16px 0px rgba(183, 29, 24, 0.24)',
        default: '0px 8px 16px 0px rgba(0, 0, 0, 0.24)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
        9: '0px 2px 3px rgba(183, 183, 183, 0.5)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        4: '0px 0px 2px rgba(0, 0, 0, 0.2)',
        5: '0px 1px 5px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        linspin: {
          '100%': { transform: 'rotate(360deg)' },
        },
        easespin: {
          '12.5%': { transform: 'rotate(135deg)' },
          '25%': { transform: 'rotate(270deg)' },
          '37.5%': { transform: 'rotate(405deg)' },
          '50%': { transform: 'rotate(540deg)' },
          '62.5%': { transform: 'rotate(675deg)' },
          '75%': { transform: 'rotate(810deg)' },
          '87.5%': { transform: 'rotate(945deg)' },
          '100%': { transform: 'rotate(1080deg)' },
        },
        'left-spin': {
          '0%': { transform: 'rotate(130deg)' },
          '50%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(130deg)' },
        },
        'right-spin': {
          '0%': { transform: 'rotate(-130deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(-130deg)' },
        },
        rotating: {
          '0%, 100%': { transform: 'rotate(360deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
        topbottom: {
          '0%, 100%': { transform: 'translate3d(0, -100%, 0)' },
          '50%': { transform: 'translate3d(0, 0, 0)' },
        },
        bottomtop: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -100%, 0)' },
        },
      },
      animation: {
        linspin: 'linspin 1568.2353ms linear infinite',
        easespin: 'easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'left-spin':
          'left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'right-spin':
          'right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
        'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
        rotating: 'rotating 30s linear infinite',
        topbottom: 'topbottom 60s infinite alternate linear',
        bottomtop: 'bottomtop 60s infinite alternate linear',
        'spin-1.5': 'spin 1.5s linear infinite',
        'spin-2': 'spin 2s linear infinite',
        'spin-3': 'spin 3s linear infinite',
      },
      borderRadius: {
        'box-large': '0.884375rem',
      },
    },
  },
  plugins: [],
};
export default config;
