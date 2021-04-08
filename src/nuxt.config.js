import { pages } from './locales/routes/pages.js'

// eslint-disable-next-line
module.exports = {
  /*
   ** Server property
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
   */
  server: {
    host: '0.0.0.0',
    port: 5000,
    timing: false
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr
   */
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target
   */
  target: 'server',
  /*
   ** Nuxt telemetry
   ** See https://github.com/nuxt/telemetry
   */
  telemetry: false,
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Router
   */
  router: {
    middleware: ['initApp', 'i18n', 'isPublic']
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/api.js',
    '~/plugins/buefy.js',
    '~/plugins/moment.js',
    '~/plugins/scrollto.js',
    '~/plugins/vee-validate.js',
    { src: '~/plugins/hotjar.js', mode: 'client' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/moment'],
  /*
   ** Nuxt Moment configuration
   ** See https://github.com/nuxt-community/moment-module
   */
  moment: {
    defaultLocale: 'en',
    locales: ['nl', 'it', 'de', 'fr', 'es'], // 'en' is builtin
    timezone: true,
    defaultTimezone: 'Europe/Amsterdam'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/proxy',
    '@nuxtjs/robots',
    '@nuxtjs/sentry',
    'nuxt-i18n',
    '@nuxtjs/sitemap', // required: always after nuxt-i18n
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/
   */
  axios: {
    proxy: true
  },
  /*
   ** Runtime config
   ** See https://nuxtjs.org/guide/runtime-config
   */
  publicRuntimeConfig: {},
  privateRuntimeConfig: {
    server: {
      host: process.env.HOST,
      port: process.env.PORT
    },
    axios: {
      baseURL: process.env.API_HOST
    }
  },
  /*
   ** Proxy module configuration
   ** See https://github.com/nuxt-community/proxy-module
   */
  proxy: {
    '/api/': {
      target: process.env.API_HOST
    }
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/schemes/local.html#usage
   */
  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        secure: false
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/auth/login',
            method: 'post',
            propertyName: 'meta.token'
          },
          logout: {
            url: '/api/v1/auth/logout',
            method: 'post'
          },
          user: {
            url: '/api/v1/auth/profile',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    },
    redirect: {
      login: () => 'login',
      logout: false,
      callback: () => 'login',
      home: false
    }
  },
  /*
   ** Nuxt i18n configuration
   ** See https://i18n.nuxtjs.org/
   */
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json'
      },
      {
        name: 'Nederlands',
        code: 'nl',
        iso: 'nl-NL',
        file: 'nl-NL.json'
      },
      {
        name: 'Italiano',
        code: 'it',
        iso: ' it-IT',
        file: 'it-IT.json'
      },
      {
        name: 'Deutsch',
        code: 'de',
        iso: ' de-DE',
        file: 'de-DE.json'
      },
      {
        name: 'Français',
        code: 'fr',
        iso: ' fr-FR',
        file: 'fr-FR.json'
      },
      {
        name: 'Español',
        code: 'es',
        iso: ' es-ES',
        file: 'es-ES.json'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    loadLanguagesAsync: true,
    langDir: 'locales/',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'fantasy_cycling_i18n',
      onlyOnRoot: true
    },
    parsePages: false, // Disable babel parsing
    pages
  },
  /*
   ** GTM module configuration
   ** See https://github.com/nuxt-community/google-gtag
   */
  'google-gtag': {
    id: 'UA-64772428-1',
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['tourzomer.com', 'fantaciclo.it', 'koersprono.be']
      }
    },
    debug: false, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
    additionalAccounts: [
      {
        id: 'AW-1026927836', // required if you are adding additional accounts
        config: {
          send_page_view: false // optional configurations
        }
      }
    ]
  },
  /*
   ** Sitemap module configuration
   ** See https://www.npmjs.com/package/@nuxtjs/sitemap
   */
  // sitemap: sitemapConfig(),
  /*
   ** Robots module configuration
   ** See https://github.com/nuxt-community/robots-module
   */
  robots: {
    UserAgent: '*',
    Disallow: '',
    Sitemap: process.env.CLIENT_HOST + '/sitemap.xml'
  },
  /*
   ** Sentry module configuration
   ** See https://github.com/nuxt-community/sentry-module
   */
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {} // Additional config
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: true,
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
