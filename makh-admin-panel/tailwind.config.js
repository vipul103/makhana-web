import colors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svg/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        theme: '#0989FF',
        themeLight: '#E1F0FF',
        themeDark: '#056ECE',
        heading: '#010F1C',
        textBody: '#55585B',
        text2: '#c5c8d4',
        text3: '#767A7D',

        success: '#50CD89',
        danger: '#F1416C',
        info: '#3E97FF',
        warning: '#ff9800',
        purple: '#7239EA',
        pink: '#f000b9',

        black: '#010F1C',
        yellow: '#FFB21D',
        red: '#EA0D42',
        gray: '#F2F2F6',
        gray2: '#E6EAF0',
        gray3: '#FFF3EC',
        gray4: '#FEEFD0',
        gray5: '#F7F7F9',
        gray6: '#EFF2F5',
        greenDark : '#75CC68',
        greenLight : '#EEFBEC',
        current: 'currentColor',
      },
      dropShadow: {
        'xs': ' 0px 1px 2px rgba(37, 39, 41, 0.12)',
      },
      boxShadow: {
        'xs': '0px 1px 2px rgba(37, 39, 41, 0.12)',
        'sm': '0px 0.1rem 1rem 0.25rem rgba(0, 0, 0, 0.05)',
        'md': '0px 2px 3px rgba(11,15,45,.1)',
        '_md': '0px -1px 4px rgba(11,15,45,.1)',
        'lg': '0px 0px 50px rgba(11,15,45,.1)',
      }

    },
    transitionTimingFunction: {
      'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
    },
    borderRadius: {
      'none': '0',
      'sm': '2px',
      DEFAULT: '4px',
      'md': '6px',
      'lg': '10px',
      'full': '9999px',
      'large': '12px',
    },
    fontFamily: {
      heading: "'Jost', sans-serif",
      body: "'Jost', sans-serif",
      fontAwesome: "'Font Awesome 6 Pro'",
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '15px',

      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1380px',
      },
    },
    fontSize: {
      'xs': '8px',
      'sm': '10px',
      'tiny': '12px',
      'base': '14px',
      'lg': '16px',
      'xl': '18px',
      '2xl': '20px',
      '3xl': '22px',
      '4xl': '24px',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
  },
  plugins: [],
}
