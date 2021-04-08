import { routesEnUs } from './en-US.js'
import { routesNlNl } from './nl-NL.js'
import { routesItIt } from './it-IT.js'
import { routesDeDe } from './de-DE.js'
import { routesFrFr } from './fr-FR.js'
import { routesEsEs } from './es-ES.js'

export const pages = {
  index: {
    en: routesEnUs.index,
    nl: routesNlNl.index,
    it: routesItIt.index,
    de: routesDeDe.index,
    fr: routesFrFr.index,
    es: routesEsEs.index
  },
  'login/index': {
    en: routesEnUs.login,
    nl: routesNlNl.login,
    it: routesItIt.login,
    de: routesDeDe.login,
    fr: routesFrFr.login,
    es: routesEsEs.login
  },
  'admin/index': {
    en: routesEnUs.admin,
    nl: routesNlNl.admin,
    it: routesItIt.admin,
    de: routesDeDe.admin,
    fr: routesFrFr.admin,
    es: routesEsEs.admin
  },
  'admin/users': {
    en: routesEnUs.adminUser,
    nl: routesNlNl.adminUser,
    it: routesItIt.adminUser,
    de: routesDeDe.adminUser,
    fr: routesFrFr.adminUser,
    es: routesEsEs.adminUser
  },
  'forgotpassword/index': {
    en: routesEnUs.forgetPassword,
    nl: routesNlNl.forgetPassword,
    it: routesItIt.forgetPassword,
    de: routesDeDe.forgetPassword,
    fr: routesFrFr.forgetPassword,
    es: routesEsEs.forgetPassword
  },
  'forgotpassword/reset/index': {
    en: routesEnUs.resetPassword,
    nl: routesNlNl.resetPassword,
    it: routesItIt.resetPassword,
    de: routesDeDe.resetPassword,
    fr: routesFrFr.resetPassword,
    es: routesEsEs.resetPassword
  },
  'halloffame/index': {
    en: routesEnUs.hallOfFame,
    nl: routesNlNl.hallOfFame,
    it: routesItIt.hallOfFame,
    de: routesDeDe.hallOfFame,
    fr: routesFrFr.hallOfFame,
    es: routesEsEs.hallOfFame
  },
  'myaccount/index': {
    en: routesEnUs.myAccount,
    nl: routesNlNl.myAccount,
    it: routesItIt.myAccount,
    de: routesDeDe.myAccount,
    fr: routesFrFr.myAccount,
    es: routesEsEs.myAccount
  },
  'register/index': {
    en: routesEnUs.register,
    nl: routesNlNl.register,
    it: routesItIt.register,
    de: routesDeDe.register,
    fr: routesFrFr.register,
    es: routesEsEs.register
  },
  'request/index': {
    en: routesEnUs.request,
    nl: routesNlNl.request,
    it: routesItIt.request,
    de: routesDeDe.request,
    fr: routesFrFr.request,
    es: routesEsEs.request
  },
  'verify/_id/_hash/index': {
    en: routesEnUs.verify,
    nl: routesNlNl.verify,
    it: routesItIt.verify,
    de: routesDeDe.verify,
    fr: routesFrFr.verify,
    es: routesEsEs.verify
  },
  '_race/myprediction/index': {
    en: routesEnUs.myPrediction,
    nl: routesNlNl.myPrediction,
    it: routesItIt.myPrediction,
    de: routesDeDe.myPrediction,
    fr: routesFrFr.myPrediction,
    es: routesEsEs.myPrediction
  },
  '_race/pool/_slug/index': {
    en: routesEnUs.pool,
    nl: routesNlNl.pool,
    it: routesItIt.pool,
    de: routesDeDe.pool,
    fr: routesFrFr.pool,
    es: routesEsEs.pool
  },
  '_race/pool/_slug/ranking/_number/index': {
    en: routesEnUs.ranking,
    nl: routesNlNl.ranking,
    it: routesItIt.ranking,
    de: routesDeDe.ranking,
    fr: routesFrFr.ranking,
    es: routesEsEs.ranking
  },
  '_race/pool/_slug/ranking/_number/rankingpoints/index': {
    en: routesEnUs.rankingPoints,
    nl: routesNlNl.rankingPoints,
    it: routesItIt.rankingPoints,
    de: routesDeDe.rankingPoints,
    fr: routesFrFr.rankingPoints,
    es: routesEsEs.rankingPoints
  },
  '_race/pools/index': {
    en: routesEnUs.pools,
    nl: routesNlNl.pools,
    it: routesItIt.pools,
    de: routesDeDe.pools,
    fr: routesFrFr.pools,
    es: routesEsEs.pools
  },
  '_race/raceresults/_number/index': {
    en: routesEnUs.raceResults,
    nl: routesNlNl.raceResults,
    it: routesItIt.raceResults,
    de: routesDeDe.raceResults,
    fr: routesFrFr.raceResults,
    es: routesEsEs.raceResults
  },
  '_race/rankingpools/_number/index': {
    en: routesEnUs.rankingPools,
    nl: routesNlNl.rankingPools,
    it: routesItIt.rankingPools,
    de: routesDeDe.rankingPools,
    fr: routesFrFr.rankingPools,
    es: routesEsEs.rankingPools
  },
  '_race/rankinguserteams/_number/index': {
    en: routesEnUs.login,
    nl: routesNlNl.login,
    it: routesItIt.login,
    de: routesDeDe.login,
    fr: routesFrFr.login,
    es: routesEsEs.login
  },
  '_race/rankinguserteams/_number/rankingpoints/index': {
    en: routesEnUs.rankingUserTeams,
    nl: routesNlNl.rankingUserTeams,
    it: routesItIt.rankingUserTeams,
    de: routesDeDe.rankingUserTeams,
    fr: routesFrFr.rankingUserTeams,
    es: routesEsEs.rankingUserTeams
  },
  '_race/stats/index': {
    en: routesEnUs.stats,
    nl: routesNlNl.stats,
    it: routesItIt.stats,
    de: routesDeDe.stats,
    fr: routesFrFr.stats,
    es: routesEsEs.stats
  },
  '_race/userteam/_slug/index': {
    en: routesEnUs.userteam,
    nl: routesNlNl.userteam,
    it: routesItIt.userteam,
    de: routesDeDe.userteam,
    fr: routesFrFr.userteam,
    es: routesEsEs.userteam
  },
  '_race/userteams/index': {
    en: routesEnUs.userteams,
    nl: routesNlNl.userteams,
    it: routesItIt.userteams,
    de: routesDeDe.userteams,
    fr: routesFrFr.userteams,
    es: routesEsEs.userteams
  },
  '_race/index': {
    en: routesEnUs.raceIndex,
    nl: routesNlNl.raceIndex,
    it: routesItIt.raceIndex,
    de: routesDeDe.raceIndex,
    fr: routesFrFr.raceIndex,
    es: routesEsEs.raceIndex
  },
  '_race/organizepool': {
    en: routesEnUs.organizepool,
    nl: routesNlNl.organizepool,
    it: routesItIt.organizepool,
    de: routesDeDe.organizepool,
    fr: routesFrFr.organizepool,
    es: routesEsEs.organizepool
  },
  '_race/prizes': {
    en: routesEnUs.prizes,
    nl: routesNlNl.prizes,
    it: routesItIt.prizes,
    de: routesDeDe.prizes,
    fr: routesFrFr.prizes,
    es: routesEsEs.prizes
  },
  '_race/rules': {
    en: routesEnUs.rules,
    nl: routesNlNl.rules,
    it: routesItIt.rules,
    de: routesDeDe.rules,
    fr: routesFrFr.rules,
    es: routesEsEs.rules
  },
  '_race/stages': {
    en: routesEnUs.stages,
    nl: routesNlNl.stages,
    it: routesItIt.stages,
    de: routesDeDe.stages,
    fr: routesFrFr.stages,
    es: routesEsEs.stages
  },
  '_race/teams': {
    en: routesEnUs.teams,
    nl: routesNlNl.teams,
    it: routesItIt.teams,
    de: routesDeDe.teams,
    fr: routesFrFr.teams,
    es: routesEsEs.teams
  }
}
