<template>
  <section class="section">
    <div class="container is-clearfix">
      <template v-if="!isAuthenticated">
        <div class="has-text-centered is-hidden-desktop pb-3">
          <nuxt-link :to="localePath('login')" class="button is-small is-white">
            {{ $t('navbar_item_login') }}
          </nuxt-link>
          <nuxt-link
            :to="localePath('register')"
            class="button is-small"
            :class="settings.domain.navbar_button_class"
          >
            {{ $t('navbar_item_register') }}
          </nuxt-link>
        </div>
      </template>
      <template v-else>
        <div class="has-text-centered is-hidden-desktop pb-3">
          <template v-if="!getUserteam && !selectedRace.is_finished">
            <b-button
              class="is-primary is-small"
              @click="openAddUserteamModal()"
            >
              {{ $t('menu_add_userteam') }}
            </b-button>
          </template>
          <template v-if="getUserteam">
            <nuxt-link
              key="menu_team_link"
              :to="
                localePath({
                  name: 'race-userteam-slug',
                  params: {
                    race: selectedRace.slug,
                    slug: getUserteam.slug
                  }
                })
              "
              class="is-hidden-desktop mr-1"
            >
              {{ getUserteam.name }}
            </nuxt-link>
            <template v-if="!selectedRace.is_finished">
              /
              <nuxt-link
                key="menu_myprediction_link"
                :to="
                  localePath({
                    name: 'race-myprediction',
                    params: {
                      race: selectedRace.slug
                    }
                  })
                "
                class="is-hidden-desktop ml-1"
              >
                {{ $t('navbar_item_myprediction') }}
              </nuxt-link>
            </template>
          </template>
        </div>
      </template>
      <!-- Left side -->
      <div class="columns is-gapless">
        <div class="column">
          <div class="pt-2 has-text-centered-touch">
            <div class="is-hidden-desktop">
              <RacesDropdown :classes="racesDropdownClasses" />
            </div>
            <template v-if="settings.race.slug === selectedRace.slug">
              <nuxt-link key="menu_home" :to="localePath('index')" class="mr-1">
                {{ $t('menu_home') }}
              </nuxt-link>
            </template>
            <template v-if="settings.race.slug !== selectedRace.slug">
              <nuxt-link
                key="menu_home"
                :to="
                  localePath({
                    name: 'race',
                    params: {
                      race: selectedRace.slug
                    }
                  })
                "
                class="mr-1"
              >
                {{ $t('menu_home') }}
              </nuxt-link>
            </template>
            <template v-if="!selectedRace.has_started">
              <nuxt-link
                key="menu_userteams"
                :to="
                  localePath({
                    name: 'race-userteams',
                    params: {
                      race: selectedRace.slug
                    }
                  })
                "
                class="mx-1"
              >
                {{ $t('menu_ranking') }}
              </nuxt-link>
              <nuxt-link
                key="menu_pools"
                :to="
                  localePath({
                    name: 'race-pools',
                    params: {
                      race: selectedRace.slug
                    }
                  })
                "
                class="mx-1"
              >
                {{ getPooltype }}
              </nuxt-link>
            </template>
            <template v-if="selectedRace.has_started">
              <nuxt-link
                key="menu_rankinguserteams"
                :to="
                  localePath({
                    name: 'race-rankinguserteams-number',
                    params: {
                      race: selectedRace.slug,
                      number: selectedRace.current_stage_number
                    }
                  })
                "
                class="mx-1"
              >
                {{ $t('menu_ranking') }}
              </nuxt-link>
              <nuxt-link
                key="menu_rankingpools"
                :to="
                  localePath({
                    name: 'race-rankingpools-number',
                    params: {
                      race: selectedRace.slug,
                      number: selectedRace.current_stage_number
                    }
                  })
                "
                class="mx-1"
              >
                {{ getPooltype }}
              </nuxt-link>
            </template>
            <nuxt-link
              v-for="link of $options.menuConfig"
              :key="link.name"
              :to="
                localePath({
                  name: link.name,
                  params: {
                    race: selectedRace.slug,
                    number: selectedRace.current_stage_number
                  }
                })
              "
              :class="link.class"
            >
              {{ $t(link.label) }}
            </nuxt-link>
          </div>
        </div>
        <div class="column is-one-quarter has-text-right is-hidden-touch">
          <!-- Right side -->
          <div>
            <RacesDropdown />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import RacesDropdown from '@/components/elements/RacesDropdown'
import AddUserteamModal from '@/components/modals/AddUserteamModal'

export default {
  components: {
    RacesDropdown
  },
  data() {
    return {
      racesDropdownClasses: 'is-small mb-2'
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
    },
    getPooltype() {
      if (this.settings.pooltype.name_locale_plural) {
        return this.$t(this.settings.pooltype.name_locale_plural)
      }

      return this.$t('menu_pools')
    }
  },
  created() {
    this.$options.menuConfig = [
      {
        name: 'race-raceresults-number',
        label: 'menu_results',
        class: 'mx-1'
      },
      {
        name: 'race-stats',
        label: 'menu_stats',
        class: 'mx-1'
      },
      {
        name: 'race-stages',
        label: 'menu_stages',
        class: 'mx-1'
      },
      {
        name: 'race-teams',
        label: 'menu_teams',
        class: 'mx-1'
      },

      {
        name: 'race-prizes',
        label: 'menu_prizes',
        class: 'mx-1'
      },
      {
        name: 'race-rules',
        label: 'menu_rules',
        class: 'ml-1'
      }
    ]
  },
  methods: {
    openAddUserteamModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AddUserteamModal,
        hasModalCard: true,
        trapFocus: true
      })
    }
  }
}
</script>

<style scoped>
.nuxt-link-exact-active {
  display: inline-block;
  text-decoration: underline;
}
</style>
