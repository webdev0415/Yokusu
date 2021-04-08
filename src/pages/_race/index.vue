<template>
  <section class="section">
    <div class="container">
      <PageTitle> {{ selectedRace.name }} {{ selectedRace.year }} </PageTitle>
      <div class="columns">
        <!-- first column -->
        <div class="column is-one-third-desktop">
          <div class="content">
            <template v-if="!selectedRace.is_finished">
              <h2 class="title is-5 mb-3">
                <strong>{{ $t('page_home_next_stage') }}</strong>
              </h2>
              <NextStage />
            </template>
            <h2 class="title is-5 mb-3">
              <strong>{{ $t('page_home_results') }}</strong>
            </h2>
            <Results />
          </div>
        </div>
        <!-- second column -->
        <div class="column is-one-third-desktop">
          <div class="content">
            <h2 class="title is-5 mb-3">
              <strong>{{ $t('page_home_userteams_top10') }}</strong>
            </h2>
            <template v-if="!selectedRace.has_started">
              <TopTenUserteams />
            </template>
            <template v-if="selectedRace.has_started">
              <TopTenRankinguserteams />
            </template>

            <h2 class="title is-5 mb-3">
              <strong>{{ getPooltype }}</strong>
            </h2>
            <template v-if="!selectedRace.has_started">
              <TopTenPools />
            </template>
            <template v-if="selectedRace.has_started">
              <TopTenRankingpools />
            </template>
          </div>
        </div>
        <!-- third column -->
        <div class="column is-one-third-desktop">
          <h2 class="title is-5 mb-3">
            <strong>{{ $t('page_home_news') }}</strong>
          </h2>
          <News />
          <p class="mt-3 mb-4">
            <a :href="settings.domain.news_url" target="_blank">
              {{ $t('page_home_link_news_text') }} &raquo;
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import TopTenUserteams from '@/components/home/TopTenUserteams'
import TopTenPools from '@/components/home/TopTenPools'
import TopTenRankinguserteams from '@/components/home/TopTenRankinguserteams'
import TopTenRankingpools from '@/components/home/TopTenRankingpools'
import NextStage from '@/components/home/NextStage'
import Results from '@/components/home/Results'
import News from '@/components/home/News'

export default {
  components: {
    PageTitle,
    TopTenUserteams,
    TopTenPools,
    TopTenRankinguserteams,
    TopTenRankingpools,
    NextStage,
    Results,
    News
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    getPooltype() {
      if (this.settings.pooltype.name_locale_plural) {
        return (
          this.$t(this.settings.pooltype.name_locale_plural) +
          ' / ' +
          this.$t('page_home_top10')
        )
      }

      return this.$t('page_home_pools_top10')
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
    const title = this.getSelectedRaceFullName()
    const description = this.$t('page_race_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
