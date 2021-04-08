<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box has-background-white">
          <PageTitle>
            {{ $t('page_login_title') }}
          </PageTitle>
          <hr />
          <b-notification v-if="settings.domain.is_demo" :closable="isClosable">
            {{
              $t('page_login_demo_notification', {
                email: settings.domain.demo_username,
                password: settings.domain.demo_password
              })
            }}
          </b-notification>
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <form @submit.prevent="passes(userLogin)">
              <ValidationProvider
                v-slot="{ errors }"
                vid="email"
                rules="required|email"
                :name="$t('page_login_form_field_email_label')"
              >
                <b-field
                  :label="$t('page_login_form_field_email_label')"
                  :type="{ 'is-danger': errors[0] }"
                  :message="errors"
                >
                  <b-input
                    v-model.trim="form.email"
                    type="email"
                    :placeholder="$t('page_login_form_field_email_placeholder')"
                    @input="hideBackendError"
                  />
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                vid="password"
                rules="required|min:6"
                :name="$t('page_login_form_field_password_label')"
              >
                <b-field
                  :label="$t('page_login_form_field_password_label')"
                  :type="{ 'is-danger': errors[0] }"
                  :message="errors"
                >
                  <b-input
                    v-model.trim="form.password"
                    type="password"
                    :placeholder="
                      $t('page_login_form_field_password_placeholder')
                    "
                    password-reveal
                    @input="hideBackendError"
                  />
                </b-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="login">
                <p :class="backendError">
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </p>
              </ValidationProvider>
              <hr />
              <div class="control">
                <button type="submit" class="button is-primary">
                  {{ $t('page_login_form_submit_title') }}
                </button>
                <nuxt-link
                  :to="localePath('forgotpassword')"
                  class="is-pulled-right"
                >
                  {{ $t('page_login_forgot_password_link_title') }}
                </nuxt-link>
              </div>
            </form>
          </ValidationObserver>
          <br />
          <p>
            {{ $t('page_login_register_teaser_title') }}
            <nuxt-link :to="localePath('register')">
              {{ $t('page_login_register_teaser_link_title') }}
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'

export default {
  name: 'Login',
  middleware: 'authRedirect',
  layout: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider,
    PageTitle
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      backendError: 'is-hidden',
      isClosable: false
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
    async userLogin() {
      const loadingComponent = this.$buefy.loading.open()
      await this.$auth
        .loginWith('local', {
          data: this.form
        })
        .then(() => {
          this.$router.push(
            this.localePath({
              name: 'race-myprediction',
              params: {
                race: this.selectedRace.slug
              }
            })
          )
          loadingComponent.close()
          this.$buefy.toast.open(
            this.$t('page_login_form_toast_message_success')
          )
        })
        .catch(err => {
          loadingComponent.close()
          this.$buefy.toast.open(
            this.$t('page_login_form_toast_message_failure')
          )
          this.$refs.observer.setErrors(err.response.data.errors)
          this.backendError = 'is-visible'
          this.$sentry.captureException(err)
        })
    },
    hideBackendError() {
      this.backendError = 'is-hidden'
    }
  },
  head() {
    const title = this.$t('page_login_title')
    const description = this.$t('page_login_seo_description', {
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
