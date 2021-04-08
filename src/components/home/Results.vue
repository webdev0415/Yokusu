<template>
  <div>
    <div v-if="api_status === 'PENDING'" class="card">
      <ApiStatusPending />
    </div>
    <div v-else-if="api_status === 'ERROR'" class="card">
      <ApiStatusError />
    </div>
    <div v-else-if="api_status === 'SUCCESS'">
      <b-tabs
        v-model="activeTab"
        :multiline="multiline"
        type="is-boxed"
        position="is-centered"
        class="block results"
        expanded
      >
        <template v-for="tab in tabs">
          <b-tab-item v-if="tab.displayed" :key="tab.component_label">
            <template slot="header">
              <figure class="image is-32x32 mb-2 mx-1">
                <img :src="tab.label_image" />
              </figure>
            </template>
            <div class="box has-background-white is-radiusless">
              <h3 class="title is-6">
                {{ tab.title }}
              </h3>
              <div v-if="!selectedRace.has_started" class="content">
                <p>{{ $t('rankings_no_results') }}</p>
              </div>
              <div v-if="selectedRace.has_started" class="content">
                <template v-if="tab.component === 'Individual'">
                  <ResultsIndividual :ranking="resultsIndividualTopTen" />
                </template>
                <template v-if="tab.component === 'Points'">
                  <ResultsPoints :ranking="resultsPointsTopTen" />
                </template>
                <template v-if="tab.component === 'Climber'">
                  <ResultsClimber :ranking="resultsclimberTopTen" />
                </template>
                <template v-if="tab.component === 'Youth'">
                  <ResultsYouth :ranking="resultsYouthTopTen" />
                </template>
              </div>
            </div>
          </b-tab-item>
        </template>
      </b-tabs>
    </div>
    <p class="mt-3 mb-4">
      <nuxt-link
        :to="
          localePath({
            name: 'race-raceresults-number',
            params: {
              race: selectedRace.slug,
              number: selectedRace.current_stage_number
            }
          })
        "
        class=""
      >
        {{ $t('page_home_link_results_text') }} &raquo;
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'
import ResultsIndividual from '@/components/home/ResultsIndividual'
import ResultsPoints from '@/components/home/ResultsPoints'
import ResultsClimber from '@/components/home/ResultsClimber'
import ResultsYouth from '@/components/home/ResultsYouth'

export default {
  components: {
    ResultsIndividual,
    ResultsPoints,
    ResultsClimber,
    ResultsYouth
  },
  data() {
    return {
      api_status: 'PENDING',
      activeTab: 0,
      multiline: true,
      resultsIndividualTopTen: [],
      resultsPointsTopTen: [],
      resultsclimberTopTen: [],
      resultsYouthTopTen: []
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    baseTabs() {
      return this.getTabs()
    },
    tabs() {
      const tabs = [...this.baseTabs]
      return tabs
    }
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getRaceRankingsTopTen(
          this.selectedRace.slug,
          this.selectedRace.current_stage_number
        )
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      const individualTopTen = []
      const pointsTopTen = []
      const climberTopTen = []
      const youthTopTen = []

      if (data.length !== 0) {
        data.forEach((item, index) => {
          if (item.race_rankingtype.ranking_title === 'Individual') {
            individualTopTen.push(item)
          }
          if (item.race_rankingtype.ranking_title === 'Points') {
            pointsTopTen.push(item)
          }
          if (item.race_rankingtype.ranking_title === 'Climber') {
            climberTopTen.push(item)
          }
          if (item.race_rankingtype.ranking_title === 'Youth') {
            youthTopTen.push(item)
          }
        })
      }

      this.resultsIndividualTopTen = individualTopTen
      this.resultsPointsTopTen = pointsTopTen
      this.resultsclimberTopTen = climberTopTen
      this.resultsYouthTopTen = youthTopTen

      this.api_status = 'SUCCESS'
    },
    getTabs() {
      const tabs = []

      this.selectedRaceRankingtypes.forEach(item => {
        const tab = {
          title: this.$t(item.ranking_title_locale),
          label: this.$t(item.ranking_title_locale),
          label_image: item.image_url,
          component: item.ranking_title,
          displayed: true
        }

        if (item.ranking_title !== 'Team') {
          tabs.push(tab)
        }
      })

      return tabs
    }
  }
}
</script>
