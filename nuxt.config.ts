import path from 'path'
import { NuxtConfig } from '@nuxt/types'
import { LOCALE } from './common/constants/common'

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Quasarian Creator Admin',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/styles/vendors/default/theme/index.css',
    '~/assets/styles/main.scss',
  ],

  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/constants',
    '@/plugins/utils',
    '@/plugins/enums',
    '@/plugins/i18n',
    '@/plugins/directive',
    '@/plugins/lodash',
    '@/plugins/numeral',
    '@/plugins/string-format',
    '@/plugins/iconify',
    '@/plugins/axios',
    '@/plugins/vue-frag',
    '@/plugins/supabase',
    '@/plugins/filter',
    '@/plugins/vue-debounce',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server-middleware/index.ts',
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/device',
    '@nuxtjs/moment',
    '@nuxtjs/router-extras',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    'nuxt-client-init-module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_API_URL,
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: `en.json`,
      },
    ],
    defaultLocale: process.env.LOCALE || LOCALE,
    lazy: true,
    langDir: 'locales/',
    vueI18n: {
      fallbackLocale: process.env.LOCALE || LOCALE,
    },
    baseUrl: '/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: process.env.LOCALE || LOCALE,
    },
  },

  styleResources: {
    scss: ['~/assets/styles/base/mixins.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],

    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler'),
      },
    },

    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },

    extend(config) {
      config.resolve!.alias!.vue = path.resolve(
        __dirname,
        'node_modules/vue/dist/vue.runtime.esm.js'
      )
    },
  },

  publicRuntimeConfig: {
    locale: process.env.LOCALE || LOCALE,
    baseApiUrl: process.env.BASE_API_URL,
    supabaseUrl: process.env.SUPABASE_URL,
    publicAnonKey: process.env.PUBLIC_ANON_KEY,
  },
}

export default config
