<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_stats_title') }}
      </PageTitle>
      <template v-if="hasRiderStats">
        <div class="columns">
          <div class="column">
            <b-tabs v-model="activeTab" class="no-padding-tab-content">
              <b-tab-item :label="$t('page_stats_rider_points')">
                <RiderPoints :rider-stats="riderStats" />
              </b-tab-item>
              <b-tab-item :label="$t('page_stats_rider_selected')">
                <RiderSelected :rider-stats="riderStats" />
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </template>
      <template v-if="!hasRiderStats">
        <div class="box has-background-white">
          <div class="content">
            <p>{{ $t('page_stats_no_rider_stats_message') }}</p>
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
import RiderPoints from '@/components/stats/RiderPoints'
import RiderSelected from '@/components/stats/RiderSelected'

export default {
  components: {
    PageTitle,
    RiderPoints,
    RiderSelected
  },
  async asyncData({ app, params, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getRiderStats(params.race)
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    let containsRiderStats = true

    if (data.length === 0) {
      containsRiderStats = false
    }

    return {
      hasRiderStats: containsRiderStats,
      riderStats: data
    }
  },
  data() {
    return {
      activeTab: 0,
      hasRiderStats: true,
      riderStats: []
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
      this.$t('page_stats_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_stats_seo_description', {
      race: this.getSelectedRaceFullName(),
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
