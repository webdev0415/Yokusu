<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <h1 class="title is-4 mb-2">
            {{ $t('page_rankinguserteams_title') }}
          </h1>
          <div class="is-clearfix">
            <AfterStageDropdown
              :selected-button-title="$t('page_ranking_after_stage')"
              :selected-button-subtitle="$t('page_ranking_after_stage')"
              :selected-page-title="$t('page_rankinguserteams_title')"
              :selected-page-name="'race-rankinguserteams-number'"
              :selected-stage-number="this.$route.params.number"
            />
            <nuxt-link
              :to="
                localePath({
                  name: 'race-rankinguserteams-number-rankingpoints',
                  params: {
                    race: selectedRace.slug,
                    number: this.$route.params.number
                  }
                })
              "
              class="button is-text is-small"
            >
              {{ $t('page_rankingpoints_link') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <Rankinguserteams />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import Rankinguserteams from '@/components/Rankinguserteams'
import AfterStageDropdown from '@/components/elements/AfterStageDropdown'

export default {
  components: {
    AfterStageDropdown,
    Rankinguserteams
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
      this.$t('page_rankinguserteams_title') +
      ' - ' +
      this.getSelectedRaceFullName()
    const description = this.$t('page_rankinguserteams_seo_description', {
      race: this.getSelectedRaceFullName(),
      number: this.$route.params.number
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
