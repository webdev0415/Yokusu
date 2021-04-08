import { types } from '@/store'
import { withCatch } from '@/utils'

export default async function({
  app,
  store,
  params,
  redirect,
  $sentry,
  route
}) {
  const cookieLocale = app.$cookies.get('fantasy_cycling_i18n')

  // Match requested race with selected race
  const { response, error } = await withCatch(() =>
    store.dispatch(types.getAppSettings)
  )

  if (error) {
    return redirect(app.localePath('promo'))
  }

  const { domain, race } = response

  // Set lang on first init based on cookie locale
  if (!store.state.initialized) {
    store.commit('SET_INITIALIZED', true)
    if (!cookieLocale) {
      const routeLocal = route.path.split('/')[1]

      if (routeLocal) {
        if (process.client) {
          app.i18n.setLocaleCookie(routeLocal)
        }
        await app.i18n.setLocale(routeLocal)
      }

      if (process.client) {
        app.i18n.setLocaleCookie(domain.default_lang)
      }
      await app.i18n.setLocale(domain.default_lang)
    }
  }

  if (!params.race || params.race === race.slug) {
    store.commit('SET_SELECTED_RACE', race)
    store.commit('SET_SELECTED_RACE_STAGES', race.stages)
    store.commit('SET_SELECTED_RACE_RANKINGTYPES', race.rankingtypes)
    return
  }

  const { response: res, error: err } = await withCatch(() =>
    app.context.$raceApi.getRace(params.race)
  )

  if (err) {
    $sentry.captureException(err)
    app.context.error({ statusCode: 404 })
    return
  }

  const { data } = res

  store.commit('SET_SELECTED_RACE', data)
  store.commit('SET_SELECTED_RACE_STAGES', data.stages)
  store.commit('SET_SELECTED_RACE_RANKINGTYPES', data.rankingtypes)
}
