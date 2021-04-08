// Reference: https://elision.design/en/blog/dynamic-routes-in-sitemap-with-nuxt-js
import { routesEnUs } from './locales/routes/en-US.js'
import { routesNlNl } from './locales/routes/nl-NL.js'
import { routesItIt } from './locales/routes/it-IT.js'
import { routesDeDe } from './locales/routes/de-DE.js'
import { routesFrFr } from './locales/routes/fr-FR.js'
import { routesEsEs } from './locales/routes/es-ES.js'

const axios = require('axios')

module.exports = async function getAppRoutes() {
  // Initiate axios
  const instance = axios.create({
    baseURL: process.env.API_HOST,
    headers: {
      common: {
        'client-host': process.env.CLIENT_HOST || 'localhost'
      }
    }
  })

  instance.interceptors.response.use(response => {
    return response.data
  })

  const routes = []
  const races = []
  const availableLanguages = []

  try {
    const { data: settings } = await instance.get('/api/v1/fantasy/settings')

    settings.races.forEach(race => {
      races.push(race.race.slug)
    })

    availableLanguages.push(settings.domain.default_lang)
  } catch (err) {
    // eslint-disable-next-line
    console.log(err)
  }

  for (const lang of availableLanguages) {
    for (let i = 0; i < races.length; i += 1) {
      const raceSlug = races[i]

      let defaultRoutes

      // Default routes
      switch (lang) {
        case 'en':
          defaultRoutes = routesEnUs.default
          break

        case 'nl':
          defaultRoutes = routesNlNl.default
          break

        case 'it':
          defaultRoutes = routesItIt.default
          break

        case 'de':
          defaultRoutes = routesDeDe.default
          break

        case 'fr':
          defaultRoutes = routesFrFr.default
          break

        case 'es':
          defaultRoutes = routesEsEs.default
          break

        default:
          defaultRoutes = routesEnUs.default
          break
      }
      // eslint-disable-next-line
      console.log(defaultRoutes, 'ssss')

      defaultRoutes.forEach(defaultRoute => {
        const defaultRoutePath = defaultRoute.replace(/:race/, raceSlug)
        routes.push(defaultRoutePath)
      })

      // Add userteams
      try {
        const { data: userteams } = await instance.get(
          `/api/v1/race/${raceSlug}/userteams/all`
        )

        userteams.forEach(({ slug }) => {
          const routePath = `/${lang}/${raceSlug}/team/${slug}`
          routes.push(routePath)
        })
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }

      // Add pools
      try {
        const { data: pools } = await instance.get(
          `/api/v1/race/${raceSlug}/pools/all`
        )

        pools.forEach(pool => {
          const routePath = `/${lang}/${raceSlug}/pool/${pool.slug}`
          routes.push(routePath)
        })
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    }
  }

  return routes
}
