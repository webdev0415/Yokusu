export default $axios => resource => ({
  // Gets
  getSettings() {
    return $axios.$get(`${resource}/settings`)
  },
  getHallOfFame() {
    return $axios.$get(`${resource}/stats/halloffame`)
  }
})
