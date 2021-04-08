import auth from '@/api/auth'
import admin from '@/api/admin'
import fantasy from '@/api/fantasy'
import race from '@/api/race'

export default ({ req, $axios, app }, inject) => {
  $axios.setHeader('Content-Language', app.i18n.locale)
  if (process.server) {
    $axios.setHeader('client-host', req.headers.host)
  }
  if (process.client) {
    $axios.setHeader('client-host', window.location.hostname)
  }
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  const authApi = auth($axios)
  const adminApi = admin($axios)
  const fantasyApi = fantasy($axios)
  const raceApi = race($axios)

  inject('authApi', authApi('/api/v1/auth'))
  inject('adminApi', adminApi('/api/v1/admin'))
  inject('fantasyApi', fantasyApi('/api/v1/fantasy'))
  inject('raceApi', raceApi('/api/v1/race'))
}
