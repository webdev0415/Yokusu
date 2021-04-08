<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_teams_title') }}
      </PageTitle>
      <template v-if="hasTeams">
        <div class="columns is-multiline">
          <TeamCard v-for="team in teams" :key="team.id" :team="team" />
        </div>
      </template>
      <template v-if="!hasTeams">
        <div class="box has-background-white">
          <div class="content">
            <p>{{ $t('page_teams_no_teams_message') }}</p>
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
import TeamCard from '@/components/cards/TeamCard'

export default {
  components: {
    PageTitle,
    TeamCard
  },
  async asyncData({ app, params, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getTeams(params.race)
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    let containsTeams = true

    if (data.length === 0) {
      containsTeams = false
    }

    return {
      hasTeams: containsTeams,
      teams: data
    }
  },
  data() {
    return {
      hasTeams: true,
      teams: []
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
      this.$t('page_teams_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_teams_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
