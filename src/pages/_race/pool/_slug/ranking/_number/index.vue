<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <h1 class="title is-4 mb-1">
            {{ pool.name }}
          </h1>
          <small>
            {{ $t('page_pool_manager') }}:
            <nuxt-link
              :to="
                localePath({
                  name: 'race-userteam-slug',
                  params: { race: selectedRace.slug, slug: pool.manager.slug }
                })
              "
              class="mb-4"
            >
              {{ pool.manager.name }}
            </nuxt-link>
          </small>
          <div class="is-clearfix mt-2">
            <AfterStageDropdown
              :selected-button-title="
                $t('page_pool_ranking_after_stage_dropdown')
              "
              :selected-button-subtitle="
                $t('page_pool_ranking_after_stage_dropdown')
              "
              :selected-page-title="''"
              :selected-page-name="'race-pool-slug-ranking-number'"
              :selected-stage-number="this.$route.params.number"
            />
            <nuxt-link
              :to="
                localePath({
                  name: 'race-pool-slug-ranking-number-rankingpoints',
                  params: {
                    race: selectedRace.slug,
                    number: this.$route.params.number
                  }
                })
              "
              class="button is-text is-small"
            >
              {{ $t('page_pool_ranking_per_stage_link') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <RankinguserteamsOfPool
        :pool="pool"
        :selected-stage-number="this.$route.params.number"
      />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { withCatch, getMetaTags } from '@/utils'
import RankinguserteamsOfPool from '@/components/RankinguserteamsOfPool'

export default {
  components: {
    RankinguserteamsOfPool
  },
  async asyncData({ app, params, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getPool(params.race, params.slug)
    )

    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 404 })
      return
    }

    const { data } = res

    return { pool: data }
  },
  data() {
    return {
      pool: '',
      componentKey: 0,
      isManager: false,
      isMember: false
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter()
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
    const title = this.pool.name + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_pool_ranking_seo_description', {
      pool: this.pool.name,
      number: this.$route.params.number
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
