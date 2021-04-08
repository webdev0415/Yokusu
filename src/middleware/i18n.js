export default function({ isHMR, app, store, route }) {
  if (isHMR) {
    return
  }
  if (route.path !== '/') {
    const pathArray = route.path.split('/')

    const localeList = ['en', 'nl', 'it', 'de', 'fr', 'es']
    if (localeList.includes(pathArray[1])) {
      // Set Language
      const locale = pathArray[1]
      // TODO: how do i store and retrieve the locale from a cookie
      // const locale = app.$cookies.get('app-lang')
      app.i18n.setLocale(locale)
      // store.commit('SET_LANG', locale)
    } else {
      app.i18n.setLocale(localeList[0])
    }
  }
}
