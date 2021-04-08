<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_hall_of_fame_title') }}
      </PageTitle>
      <div class="columns">
        <div class="column">
          <HallOfFame />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import HallOfFame from '@/components/stats/HallOfFame'

export default {
  components: {
    PageTitle,
    HallOfFame
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
    const title = this.$t('page_hall_of_fame_title')
    const description = this.$t('page_hall_of_fame_seo_description', {
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
