export const routesDeDe = {
  default: ['/de/:race', '/de/:race/stand'],
  index: '/',
  raceIndex: '/:race',
  organizepool: '/:race/tipprunde-organisieren',
  prizes: '/:race/preise',
  admin: '/admin',
  adminUser: '/admin/benutzer',
  forgetPassword: '/passwort-vergessen',
  resetPassword: '/passwort-vergessen/zurucksetzen',
  hallOfFame: '/hall-of-fame',
  login: '/anmeldung',
  myAccount: '/mein-konto',
  register: '/registrieren',
  request: '/request',
  verify: '/verifizieren/:id/:hash',
  rules: '/:race/regeln',
  stages: '/:race/etappen',
  teams: '/:race/teams',
  myPrediction: '/:race/meine-prognose',
  pool: '/:race/tipprunde/:slug',
  ranking: '/:race/tipprunde/:slug/ranking/:number',
  rankingPoints: '/:race/tipprunde/:slug/ranking/:number/tagessieger',
  pools: '/:race/tipprunden',
  raceResults: '/:race/ergebnisse/:number',
  rankingPools: '/:race/tipprunden/:number',
  rankingUserTeams: '/:race/ranking/:number',
  rankingTeamPoints: '/:race/ranking/:number/tagessieger',
  stats: '/:race/statistik',
  userteam: '/:race/team/:slug',
  userteams: '/:race/ranking'
}
