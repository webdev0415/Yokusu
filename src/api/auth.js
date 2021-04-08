export default $axios => resource => ({
  // Gets
  getProfile() {
    return $axios.$get(`${resource}/profile`)
  },
  // Deletes
  deleteUser(userId) {
    return $axios.$delete(`${resource}/user/${userId}`)
  }
})
