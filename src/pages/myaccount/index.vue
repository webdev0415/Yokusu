<template>
  <section class="section">
    <div v-if="loggedInUser" class="container">
      <div class="columns is-centered">
        <div class="column is-6-desktop is-6-widescreen">
          <PageTitle>
            {{ $t('page_myaccount_title') }}
          </PageTitle>
          <div class="box has-background-white">
            <b-tabs v-model="activeTab">
              <b-tab-item :label="$t('page_myaccount_details')">
                <div class="columns is-mobile mt-2">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_details_email') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong>{{ loggedInUser.email }}</strong>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_details_first_name') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong>{{ loggedInUser.userprofile.first_name }}</strong>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_details_last_name') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong>{{ loggedInUser.userprofile.last_name }}</strong>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_details_public_name') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong>{{ loggedInUser.userprofile.public_name }}</strong>
                  </div>
                </div>
              </b-tab-item>
              <b-tab-item :label="$t('page_myaccount_settings')">
                <div class="columns is-mobile mt-2">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_settings_newsletter') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong v-if="loggedInUser.userprofile.newsletter">{{
                      $t('page_myaccount_settings_newsletter_yes')
                    }}</strong>
                    <strong v-else>{{
                      $t('page_myaccount_settings_newsletter_no')
                    }}</strong>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-one-third has-text-right-desktop">
                    {{ $t('page_myaccount_settings_account') }}
                  </div>
                  <div class="column is-two-thirds">
                    <strong>{{
                      $t('page_myaccount_settings_account_active')
                    }}</strong>
                    <b-button
                      class="is-text is-small"
                      @click="confirmDeleteAccount()"
                    >
                      {{ $t('page_myaccount_settings_account_delete_button') }}
                    </b-button>
                  </div>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { getMetaTags, withCatch } from '@/utils'
import PageTitle from '@/components/PageTitle'

export default {
  middleware: 'authRequired',
  components: {
    PageTitle
  },
  data() {
    return {
      activeTab: 0
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
    confirmDeleteAccount() {
      this.$buefy.dialog.confirm({
        title: this.$t('page_myaccount_settings_account_delete_dialog_title'),
        message: this.$t(
          'page_myaccount_settings_account_delete_dialog_message'
        ),
        cancelText: this.$t(
          'page_myaccount_settings_account_delete_dialog_cancel_text'
        ),
        confirmText: this.$t(
          'page_myaccount_settings_account_delete_dialog_confirm_text'
        ),
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open()

          const { error: err } = await withCatch(() =>
            this.$authApi.deleteUser(this.loggedInUser.id)
          )

          if (err) {
            loadingComponent.close()
            this.$buefy.toast.open(
              this.$t(
                'page_myaccount_settings_account_delete_dialog_toast_message_failure'
              )
            )
            this.$sentry.captureException(err)
            return
          }
          loadingComponent.close()

          this.$buefy.toast.open(
            this.$t(
              'page_myaccount_settings_account_delete_dialog_toast_message_success'
            )
          )

          // After delete, logout & redirect
          this.$auth.logout()
          this.$router.push(this.localePath('index'))
        }
      })
    }
  },
  head() {
    const title = this.$t('page_myaccount_title')
    const description = this.$t('page_myaccount_seo_description', {
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
