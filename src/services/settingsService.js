import { mapGetters } from 'vuex'
import { types } from '@/store'

export const settingsStateMapGetter = () =>
  mapGetters({
    settings: types.settings,
    navbarColor: types.navbarColor,
    selectedRace: types.selectedRace,
    selectedRaceStages: types.selectedRaceStages,
    selectedRaceRankingtypes: types.selectedRaceRankingtypes,
    activeRaces: types.activeRaces
  })
