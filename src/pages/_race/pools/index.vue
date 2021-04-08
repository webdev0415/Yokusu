<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless  is-vcentered">
        <div class="column">
          <h1 class="title is-4 mb-1">
            {{ getPooltype }}
          </h1>
          <template v-if="!selectedRace.has_started">
            <div class="mt-3">
              <template v-if="!isAuthenticated">
                <nuxt-link
                  v-if="!selectedRace.has_started"
                  class="button is-primary"
                  :to="
                    localePath({
                      name: 'race-organizepool',
                      params: { race: selectedRace.slug }
                    })
                  "
                >
                  {{ getPooltypeAdd }}
                </nuxt-link>
              </template>
              <template v-if="isAuthenticated">
                <template v-if="!hasUserteam">
                  <b-tooltip
                    :label="
                      $t('page_pools_button_add_pool_no_userteam_tooltip')
                    "
                    type="is-white"
                    position="is-right"
                  >
                    <b-button
                      class="is-primary"
                      disabled
                      @click="openAddPoolModal()"
                    >
                      {{ getPooltypeAdd }}
                    </b-button>
                  </b-tooltip>
                </template>
                <template v-else>
                  <b-button class="is-primary" @click="openAddPoolModal()">
                    {{ getPooltypeAdd }}
                  </b-button>
                </template>
              </template>
            </div>
          </template>
        </div>
      </div>
      <Pools />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { getMetaTags } from '@/utils'
import Pools from '@/components/Pools'
import AddPoolModal from '@/components/modals/AddPoolModal'

export default {
  middleware: 'hasStartedRedirect',
  components: {
    Pools
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    hasUserteam() {
      const userteam = this.loggedInUser.userteams.filter(
        i => i.race_id === this.selectedRace.id
      )

      return userteam.length > 0
    },
    getPooltype() {
      if (this.settings.pooltype.name_locale_plural) {
        return this.$t(this.settings.pooltype.name_locale_plural)
      }

      return this.$t('page_pools_title')
    },
    getPooltypeAdd() {
      if (this.settings.pooltype.name_locale_singular) {
        return this.$t('page_pools_button_add_pooltype', {
          pooltype: this.$t(this.settings.pooltype.name_locale_singular)
        })
      }

      return this.$t('page_pools_button_add_pool')
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
    openAddPoolModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AddPoolModal,
        hasModalCard: true,
        trapFocus: true
      })
    }
  },
  head() {
    const title =
      this.$t('page_pools_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_pools_seo_description', {
      race: this.getSelectedRaceFullName(),
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
