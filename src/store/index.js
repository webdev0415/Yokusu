import { mirror } from '@/utils'

// create a store
export const state = () => ({
  initialized: false,
  settings: null,
  isPublic: null,
  isDemo: null,
  navbarColor: null,
  selectedRace: null,
  selectedRaceStages: null,
  selectedRaceRankingtypes: null,
  activeRaces: null,
  isAuthenticated: null,
  loggedInUser: null
})

export const types = mirror({
  // getters
  initialized: false,
  settings: null,
  isPublic: null,
  isDemo: null,
  navbarColor: null,
  selectedRace: null,
  selectedRaceStages: null,
  selectedRaceRankingtypes: null,
  activeRaces: null,
  isAuthenticated: null,
  loggedInUser: null,
  // actions
  getAppSettings: null,
  // mutations
  SET_INITIALIZED: null,
  SET_APP_SETTINGS: null,
  SET_IS_PUBLIC: null,
  SET_IS_DEMO: null,
  SET_NAVBAR_COLOR: null,
  SET_SELECTED_RACE: null,
  SET_SELECTED_RACE_STAGES: null,
  SET_SELECTED_RACE_RANKINGTYPES: null,
  SET_ACTIVE_RACES: null,
  SET_IS_AUTHENTICATED: null,
  SET_LOGGED_IN_USER: null
})

// getters
export const getters = {
  [types.initialized](state) {
    return state.initialized
  },
  [types.settings](state) {
    return state.settings
  },
  [types.isPublic](state) {
    return state.isPublic
  },
  [types.isDemo](state) {
    return state.isDemo
  },
  [types.navbarColor](state) {
    return state.navbarColor
  },
  [types.selectedRace](state) {
    return state.selectedRace
  },
  [types.selectedRaceStages](state) {
    return state.selectedRaceStages
  },
  [types.selectedRaceRankingtypes](state) {
    return state.selectedRaceRankingtypes
  },
  [types.activeRaces](state) {
    return state.activeRaces
  },
  [types.isAuthenticated](state) {
    return state.auth.loggedIn
  },
  [types.loggedInUser](state) {
    return state.auth.user
  }
}

// actions
export const actions = {
  async [types.getAppSettings]({ commit }) {
    const res = await this.$fantasyApi.getSettings()

    const { data } = res

    commit(types.SET_APP_SETTINGS, data)
    commit(types.SET_IS_PUBLIC, data.domain.is_public)
    commit(types.SET_IS_DEMO, data.domain.is_demo)
    commit(types.SET_NAVBAR_COLOR, data.domain.navbar_color)
    commit(types.SET_ACTIVE_RACES, data.races)

    return {
      domain: data.domain,
      race: data.race
    }
  }
}

// mutations
export const mutations = {
  [types.SET_INITIALIZED](state, initialized) {
    state.initialized = initialized
  },
  [types.SET_APP_SETTINGS](state, settings) {
    state.settings = settings
  },
  [types.SET_IS_PUBLIC](state, isPublic) {
    state.isPublic = isPublic
  },
  [types.SET_IS_DEMO](state, isDemo) {
    state.isDemo = isDemo
  },
  [types.SET_NAVBAR_COLOR](state, navbarColor) {
    state.navbarColor = navbarColor
  },
  [types.SET_SELECTED_RACE](state, race) {
    state.selectedRace = race
  },
  [types.SET_SELECTED_RACE_STAGES](state, stages) {
    state.selectedRaceStages = stages
  },
  [types.SET_SELECTED_RACE_RANKINGTYPES](state, rankingtypes) {
    state.selectedRaceRankingtypes = rankingtypes
  },
  [types.SET_ACTIVE_RACES](state, races) {
    state.activeRaces = races
  },
  [types.SET_IS_AUTHENTICATED](state, loggedIn) {
    state.isAuthenticated = loggedIn
  },
  [types.SET_LOGGED_IN_USER](state, user) {
    state.loggedInUser = user
  }
}
