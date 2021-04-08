import { mapGetters } from 'vuex'
import { types } from '@/store'

export const userAuthStateMapGetter = () =>
  mapGetters({
    loggedInUser: types.loggedInUser,
    isAuthenticated: types.isAuthenticated
  })
