<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <template v-if="!selectedRace.has_started">
            <PageTitle>
              {{ $t('page_raceresults_title') }}
            </PageTitle>
          </template>
          <template v-if="selectedRace.has_started">
            <h1 class="title is-4 mb-2">
              {{ $t('page_raceresults_title') }}
            </h1>
            <div class="is-clearfix">
              <AfterStageDropdown
                :selected-button-title="$t('page_ranking_after_stage')"
                :selected-button-subtitle="$t('page_ranking_after_stage')"
                :selected-page-title="$t('page_raceresults_title')"
                :selected-page-name="'race-raceresults-number'"
                :selected-stage-number="this.$route.params.number"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-tabs
            v-model="activeTab"
            :multiline="multiline"
            type="is-boxed"
            position="is-centered"
            class="block results"
          >
            <template v-for="tab in tabs">
              <b-tab-item v-if="tab.displayed" :key="tab.component_label">
                <template slot="header">
                  <figure class="image is-64x64 mb-2">
                    <img :src="tab.label_image" class="px-2 py-2" />
                  </figure>
                </template>
                <div class="box has-background-white">
                  <h2 class="title is-5">
                    {{ tab.title }}
                  </h2>
                  <hr />
                  <div v-if="!selectedRace.has_started" class="content">
                    <p>{{ $t('rankings_no_results') }}</p>
                  </div>
                  <div v-if="selectedRace.has_started">
                    <template v-if="tab.component === 'StageResults'">
                      <StageResults />
                    </template>
                    <template v-if="tab.component === 'Individual'">
                      <Individual />
                    </template>
                    <template v-if="tab.component === 'Points'">
                      <Points />
                    </template>
                    <template v-if="tab.component === 'Climber'">
                      <Climber />
                    </template>
                    <template v-if="tab.component === 'Youth'">
                      <Youth />
                    </template>
                    <template v-if="tab.component === 'Team'">
                      <Team />
                    </template>
                  </div>
                </div>
              </b-tab-item>
            </template>
          </b-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import AfterStageDropdown from '@/components/elements/AfterStageDropdown'
import StageResults from '@/components/results/StageResults'
import Individual from '@/components/results/Individual'
import Points from '@/components/results/Points'
import Climber from '@/components/results/Climber'
import Youth from '@/components/results/Youth'
import Team from '@/components/results/Team'

export default {
  name: 'Default',
  components: {
    PageTitle,
    AfterStageDropdown,
    StageResults,
    Individual,
    Points,
    Climber,
    Youth,
    Team
  },
  data() {
    return {
      activeTab: null,
      multiline: true
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    baseTabs() {
      return this.getTabs()
    },
    tabs() {
      const tabs = []
      this.baseTabs.map(tab => {
        tabs.push({
          ...tab,
          queryString: tab.label_image
            .split('/')
            .slice(-1)[0]
            .split('_')[0]
            .replace('.svg', '')
        })
      })
      return tabs
    }
  },
  watch: {
    activeTab() {
      const jerseysString = this.tabs[this.activeTab].queryString
      // eslint-disable-next-line
      this.$router.push(`${this.$route.path}?jerseys=${jerseysString}`)
    }
  },
  mounted() {
    const query = this.$route.query.jerseys
    if (query) {
      const selectedNum = this.tabs.findIndex(tab => tab.queryString === query)
      this.activeTab = selectedNum === -1 ? 1 : selectedNum
    } else {
      this.activeTab = 1
    }
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    getTabs() {
      const tabs = []

      tabs.push({
        title:
          this.$t('ranking_title_stages') + ' ' + this.$route.params.number,
        label: this.$t('ranking_title_stages'),
        label_image:
          'https://assets.yosokugames.com/cycling/jerseys/cyclist.svg',
        component: 'StageResults',
        displayed: true
      })

      this.selectedRaceRankingtypes.forEach(item => {
        const tab = {
          title: this.$t(item.ranking_title_locale),
          label: this.$t(item.ranking_title_locale),
          label_image: item.image_url,
          component: item.ranking_title,
          displayed: true
        }

        tabs.push(tab)
      })

      return tabs
    }
  },
  head() {
    const title =
      this.$t('page_raceresults_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_raceresults_seo_description', {
      race: this.getSelectedRaceFullName(),
      number: this.$route.params.number
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
