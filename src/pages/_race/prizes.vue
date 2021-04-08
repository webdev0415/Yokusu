<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_prizes_title') }}
      </PageTitle>
      <template v-if="hasPrizes">
        <div class="columns is-multiline">
          <PrizeCard v-for="prize in prizes" :key="prize.id" :prize="prize" />
        </div>
      </template>
      <template v-if="!hasPrizes">
        <div class="box has-background-white">
          <div class="content">
            <p>{{ $t('page_prizes_no_results_message') }}</p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch, getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import PrizeCard from '@/components/cards/PrizeCard'

export default {
  components: {
    PageTitle,
    PrizeCard
  },
  async asyncData({ app, params, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getPrizes(params.race)
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    let containsPrizes = true

    if (data.length === 0) {
      containsPrizes = false
    }

    return {
      hasPrizes: containsPrizes,
      prizes: data
    }
  },
  data() {
    return {
      hasPrizes: true,
      prizes: []
    }
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
      this.$t('page_prizes_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_prizes_seo_description', {
      race: this.getSelectedRaceFullName(),
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
