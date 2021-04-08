export default $axios => resource => ({
  // Gets
  getAdminUsers(params) {
    return $axios.$get(`${resource}/users`, { params })
  }
})
