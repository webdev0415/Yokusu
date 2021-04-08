<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <PageTitle>
            {{ $t('page_ranking_title') }}
          </PageTitle>
        </div>
      </div>
      <Userteams />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import Userteams from '@/components/Userteams'

export default {
  middleware: 'hasStartedRedirect',
  components: {
    PageTitle,
    Userteams
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
      this.$t('page_ranking_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_userteams_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
