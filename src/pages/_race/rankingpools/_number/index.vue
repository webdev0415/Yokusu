<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless">
        <div class="column">
          <h1 class="title is-4 mb-2">
            {{ getPooltype }}
          </h1>
          <div class="is-clearfix">
            <AfterStageDropdown
              :selected-button-title="$t('page_ranking_after_stage')"
              :selected-button-subtitle="$t('page_ranking_after_stage')"
              :selected-page-title="$t('page_rankingpools_title')"
              :selected-page-name="'race-rankingpools-number'"
              :selected-stage-number="this.$route.params.number"
            />
          </div>
        </div>
      </div>
      <Rankingpools />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { getMetaTags } from '@/utils'
import AfterStageDropdown from '@/components/elements/AfterStageDropdown'
import Rankingpools from '@/components/Rankingpools'

export default {
  components: {
    AfterStageDropdown,
    Rankingpools
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    getPooltype() {
      if (this.settings.pooltype.name_locale_plural) {
        return (
          this.$t('menu_ranking') +
          ' / ' +
          this.$t(this.settings.pooltype.name_locale_plural)
        )
      }

      return this.$t('page_rankingpools_title')
    }
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    }
  },
  head() {
    const title =
      this.$t('page_rankingpools_title') +
      ' - ' +
      this.getSelectedRaceFullName()
    const description = this.$t('page_rankingpoools_seo_description', {
      race: this.getSelectedRaceFullName(),
      number: this.$route.params.number
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
