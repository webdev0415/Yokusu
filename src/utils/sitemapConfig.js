const getAppRoutes = require('./getRoutes.js')

const defaultLang = process.env.DEFAULT_LANG || 'en'

module.exports = () => ({
  defaults: {
    changefreq: 'daily',
    priority: 1,
    lastmod: new Date()
  },
  gzip: true,
  i18n: {
    locales: [defaultLang]
  },
  exclude: ['**/admin/**'],
  routes() {
    return getAppRoutes()
  }
})
