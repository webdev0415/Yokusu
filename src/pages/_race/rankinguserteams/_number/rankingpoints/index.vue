<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <h1 class="title is-4 mb-2">
            {{ $t('page_rankingpoints_title') }}
          </h1>
          <div class="is-clearfix">
            <AfterStageDropdown
              :selected-button-title="$t('page_ranking_per_stage')"
              selected-button-subtitle="#"
              :selected-page-title="$t('page_rankingpoints_title')"
              :selected-page-name="'race-rankinguserteams-number-rankingpoints'"
              :selected-stage-number="this.$route.params.number"
            />
            <nuxt-link
              :to="
                localePath({
                  name: 'race-rankinguserteams-number',
                  params: {
                    race: selectedRace.slug,
                    number: this.$route.params.number
                  }
                })
              "
              class="button is-text is-small"
            >
              {{ $t('page_rankinguserteams_link') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <Rankingpoints />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import Rankingpoints from '@/components/Rankingpoints'
import AfterStageDropdown from '@/components/elements/AfterStageDropdown'

export default {
  components: {
    AfterStageDropdown,
    Rankingpoints
  },
  computed: {
    ...settingsStateMapGetter()
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
      this.$t('page_rankingpoints_title') +
      ' - ' +
      this.getSelectedRaceFullName()
    const description = this.$t('page_rankingpoints_seo_description', {
      race: this.getSelectedRaceFullName(),
      number: this.$route.params.number
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
