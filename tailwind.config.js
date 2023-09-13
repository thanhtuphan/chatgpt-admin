/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  darkMode: 'class',
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  safelist: ['tw-text-red-500', 'tw-text-orange-500', 'tw-text-green-500'],
  theme: {
    extend: {
      screens: {
        sm: '768px',
        md: '1024px',
        lg: '1200px',
        xl: '1400px',
      },
      colors: {
        primary: '#f97316',
      },
    },
    sidebar: {
      width: '240px',
      collapse: {
        width: '48px',
      },
    },
    gap: {
      xs: '4px',
      sm: '12px',
      md: '20px',
      lg: '32px',
      xl: '48px',
    },
    header: {
      height: '60px',
    },
  },
  plugins: [],
}
