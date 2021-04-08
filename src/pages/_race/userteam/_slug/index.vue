/* eslint-disable nuxt/no-this-in-fetch-data */
<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless is-vcentered">
        <div class="column">
          <h1 class="title is-4 mb-1">
            {{ userteam.name }}
            <template
              v-if="
                isAuthenticated &&
                  getUserteam.id === userteam.id &&
                  !selectedRace.has_started
              "
            >
              <b-button
                class="is-text is-small"
                @click="openRenameUserteamModal()"
              >
                {{ $t('page_myaccount_rename_button') }}
              </b-button>
            </template>
          </h1>
          <template v-if="userteam.is_member_of.length !== 0">
            <small> {{ $t('page_team_member') }}:</small>
            <small v-for="(pool, index) in userteam.is_member_of" :key="index">
              <nuxt-link
                :to="
                  localePath({
                    name: 'race-pool-slug',
                    params: { race: selectedRace.slug, slug: pool.slug }
                  })
                "
              >
                {{ pool.name }}
              </nuxt-link>
              <span v-if="index != userteam.is_member_of.length - 1">/ </span>
            </small>
          </template>
        </div>
      </div>
      <template v-if="!selectedRace.has_started">
        <div class="columns">
          <div class="column">
            <div class="box has-background-white">
              <h4 class="title is-5">
                {{ $t('page_team_predictions_title') }}
              </h4>
              <hr />
              <p>{{ $t('page_team_predictions_not_started_message') }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <Ranks :userteam="userteam" />
        <hr />
        <Predictions :userteam="userteam" />
      </template>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { withCatch, getMetaTags } from '@/utils'
import Ranks from '@/components/Ranks'
import Predictions from '@/components/Predictions'
import RenameUserteamModal from '@/components/modals/RenameUserteamModal'

export default {
  components: {
    Ranks,
    Predictions
  },
  async asyncData({ app, params, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getUserteam(params.race, params.slug)
    )

    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 404 })
      return
    }

    const { data } = res

    return { userteam: data }
  },
  data() {
    return {
      userteam: ''
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    getUserteam() {
      const userteam = this.loggedInUser.userteams.filter(
        i => i.race_id === this.selectedRace.id
      )

      return userteam[0]
    }
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    openRenameUserteamModal() {
      this.$buefy.modal.open({
        parent: this,
        component: RenameUserteamModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          userteam: this.getUserteam
        }
      })
    }
  },
  head() {
    const title = this.userteam.name + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_team_seo_description', {
      userteam: this.userteam.name,
      title: this.settings.domain.title,
      race: this.getSelectedRaceFullName()
    })

    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
