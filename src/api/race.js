export default $axios => resource => ({
  // Gets
  getRace(race) {
    return $axios.$get(`${resource}/${race}`)
  },
  getStages(race) {
    return $axios.$get(`${resource}/${race}/stages`)
  },
  getStagesNext(race) {
    return $axios.$get(`${resource}/${race}/stages/next`)
  },
  getRiders(race) {
    return $axios.$get(`${resource}/${race}/riders`)
  },
  getTeams(race) {
    return $axios.$get(`${resource}/${race}/teams`)
  },
  getRules(race) {
    return $axios.$get(`${resource}/${race}/rules`)
  },
  getNews(race) {
    return $axios.$get(`${resource}/${race}/news`)
  },
  getPools(race, params) {
    return $axios.$get(`${resource}/${race}/pools`, { params })
  },
  getPool(race, pool) {
    return $axios.$get(`${resource}/${race}/pools/${pool}`)
  },
  getPoolmembers(race, pool) {
    return $axios.$get(`${resource}/${race}/pools/${pool}/members`)
  },
  getPoolsTopTen(race) {
    return $axios.$get(`${resource}/${race}/pools/top10`)
  },
  getPrizes(race) {
    return $axios.$get(`${resource}/${race}/prizes`)
  },
  getPredictions(race) {
    return $axios.$get(`${resource}/${race}/predictions`)
  },
  getPredictionsOfUser(race, userteamId) {
    return $axios.$get(`${resource}/${race}/predictions/${userteamId}`)
  },
  getMyUserteam(race) {
    return $axios.$get(`${resource}/${race}/userteam`)
  },
  getUserteams(race, params) {
    return $axios.$get(`${resource}/${race}/userteams`, { params })
  },
  getUserteamsTopTen(race) {
    return $axios.$get(`${resource}/${race}/userteams/top10`)
  },
  getUserteam(race, userteam) {
    return $axios.$get(`${resource}/${race}/userteams/${userteam}`)
  },
  getRaceStageResults(race, stageNumber) {
    return $axios.$get(`${resource}/${race}/results/${stageNumber}`)
  },
  getRaceRankings(race, stageNumber, rankingtypeId) {
    return $axios.$get(
      `${resource}/${race}/racerankings/${stageNumber}?rankingtype_id=${rankingtypeId}`
    )
  },
  getRaceRankingsTopTen(race, stageNumber) {
    return $axios.$get(`${resource}/${race}/racerankings/${stageNumber}/top10`)
  },
  getRiderStats(race) {
    return $axios.$get(`${resource}/${race}/stats/riders`)
  },
  getRankinguserteams(race, stageNumber, params) {
    return $axios.$get(`${resource}/${race}/rankinguserteams/${stageNumber}`, {
      params
    })
  },
  getRankinguserteamsOfPool(race, stageNumber, poolId) {
    return $axios.$get(
      `${resource}/${race}/rankinguserteams/${stageNumber}?pool_id=${poolId}`
    )
  },
  getRankinguserteamsTopTen(race, stageNumber) {
    return $axios.$get(
      `${resource}/${race}/rankinguserteams/${stageNumber}/top10`
    )
  },
  getRankingpoints(race, stageNumber, params) {
    return $axios.$get(`${resource}/${race}/rankingpoints/${stageNumber}`, {
      params
    })
  },
  getRankingpointsOfPool(race, stageNumber, poolId) {
    return $axios.$get(
      `${resource}/${race}/rankingpoints/${stageNumber}?pool_id=${poolId}`
    )
  },
  getRankingpools(race, stageNumber, params) {
    return $axios.$get(`${resource}/${race}/rankingpools/${stageNumber}`, {
      params
    })
  },
  getRankingpoolsTopTen(race, stageNumber) {
    return $axios.$get(`${resource}/${race}/rankingpools/${stageNumber}/top10`)
  },
  // Posts
  postNewUserteam(race, data) {
    return $axios.$post(`${resource}/${race}/userteams`, data)
  }
})
