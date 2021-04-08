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
        </div>
        <div class="column has-text-centered-touch has-text-right-tablet mt-3">
          <template v-if="!isAuthenticated && !selectedRace.has_started">
            <nuxt-link
              :to="localePath('login')"
              class="button is-small is-primary is-hidden-desktop"
            >
              {{ $t('page_pool_signup_button') }}
            </nuxt-link>
            <nuxt-link
              :to="localePath('login')"
              class="button is-primary is-hidden-touch"
            >
              {{ $t('page_pool_signup_button') }}
            </nuxt-link>
          </template>
          <template v-if="isAuthenticated">
            <b-button
              v-if="isManagerOfThePool"
              class="is-link is-small is-hidden-desktop"
              @click="openRenamePoolModal()"
            >
              {{ $t('page_pool_rename_button') }}
            </b-button>
            <b-button
              v-if="isManagerOfThePool"
              class="is-link is-hidden-touch"
              @click="openRenamePoolModal()"
            >
              {{ $t('page_pool_rename_button') }}
            </b-button>
            <template v-if="!selectedRace.has_started">
              <b-button
                v-if="isNotMemberOfThePool"
                class="is-primary is-small is-hidden-desktop"
                @click="confirmSignup"
              >
                {{ $t('page_pool_signup_button') }}
              </b-button>
              <b-button
                v-if="isNotMemberOfThePool"
                class="is-primary is-hidden-touch"
                @click="confirmSignup"
              >
                {{ $t('page_pool_signup_button') }}
              </b-button>
              <b-button
                v-if="isMemberOfThePool"
                class="is-outline is-small is-hidden-desktop"
                @click="confirmSignout"
              >
                {{ $t('page_pool_signout_button') }}
              </b-button>
              <b-button
                v-if="isMemberOfThePool"
                class="is-outline is-hidden-touch"
                @click="confirmSignout"
              >
                {{ $t('page_pool_signout_button') }}
              </b-button>
            </template>
          </template>
        </div>
      </div>
      <div class="columns is-gapless is-centered">
        <div class="column">
          <ShareButtonPool />
        </div>
      </div>
      <Poolmembers :key="componentKey" @update-members="updateMembers" />
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { withCatch, getMetaTags } from '@/utils'
import Poolmembers from '@/components/Poolmembers'
import RenamePoolModal from '@/components/modals/RenamePoolModal'
import ShareButtonPool from '@/components/addthis/ShareButtonPool'

export default {
  middleware: 'hasStartedRedirect',
  components: {
    Poolmembers,
    ShareButtonPool
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
      members: [],
      componentKey: 0,
      isManager: false,
      isMember: false
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
    isManagerOfThePool() {
      return this.getUserteam.id === this.pool.manager.id
    },
    isMemberOfThePool() {
      return this.members.find(x => x.userteam.id === this.getUserteam.id)
    },
    isNotMemberOfThePool() {
      return !this.isMemberOfThePool
    }
  },
  mounted() {
    const externalScript = document.createElement('script')
    externalScript.setAttribute(
      'src',
      'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f2d31760017180e'
    )
    document.head.appendChild(externalScript)
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    updateMembers(addMembers) {
      this.members = addMembers
    },
    openRenamePoolModal() {
      this.$buefy.modal.open({
        parent: this,
        component: RenamePoolModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          pool: this.pool
        }
      })
    },
    confirmSignup() {
      this.$buefy.dialog.confirm({
        title: this.$t('page_pool_signup_dialog_title'),
        message: this.$t('page_pool_signup_dialog_message', {
          pool: this.pool.name
        }),
        cancelText: this.$t('page_pool_signup_dialog_cancel_text'),
        confirmText: this.$t('page_pool_signup_dialog_confirm_text'),
        onConfirm: () => {
          const loadingComponent = this.$buefy.loading.open()
          this.$axios
            .$post(
              `/api/v1/race/${this.$route.params.race}/pools/${this.$route.params.slug}/signup`,
              {
                fantasy_pool_id: this.pool.id,
                fantasy_userteam_id: this.getUserteam.id
              }
            )
            .then(async res => {
              loadingComponent.close()
              await this.$auth.fetchUser()
              this.componentKey += 1
              this.$buefy.toast.open(
                this.$t('page_pool_signup_dialog_toast_message_success')
              )
            })
            .catch(err => {
              loadingComponent.close()
              this.$buefy.toast.open(
                this.$t('page_pool_signup_dialog_toast_message_failure')
              )
              this.$sentry.captureException(err)
            })
        }
      })
    },
    confirmSignout() {
      this.$buefy.dialog.confirm({
        title: this.$t('page_pool_signout_dialog_title'),
        message: this.$t('page_pool_signout_dialog_message', {
          pool: this.pool.name
        }),
        cancelText: this.$t('page_pool_signout_dialog_cancel_text'),
        confirmText: this.$t('page_pool_signout_dialog_confirm_text'),
        onConfirm: () => {
          const loadingComponent = this.$buefy.loading.open()
          this.$axios
            .$delete(
              `/api/v1/race/${this.$route.params.race}/pools/${this.$route.params.slug}/signout/${this.getUserteam.id}`
            )
            .then(async res => {
              loadingComponent.close()
              await this.$auth.fetchUser()
              this.componentKey += 1
              this.$buefy.toast.open(
                this.$t('page_pool_signout_dialog_toast_message_success')
              )
            })
            .catch(err => {
              loadingComponent.close()
              this.$buefy.toast.open(
                this.$t('page_pool_signout_dialog_toast_message_failure')
              )
              this.$sentry.captureException(err)
            })
        }
      })
    }
  },
  head() {
    const title = this.pool.name + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_pool_seo_description', {
      pool: this.pool.name,
      title: this.settings.domain.title,
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
