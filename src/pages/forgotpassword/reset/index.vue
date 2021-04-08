<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box has-background-white">
          <PageTitle>
            {{ $t('page_resetpassword_title') }}
          </PageTitle>
          <hr />
          <template v-if="!isFormSuccess">
            <ValidationObserver ref="observer" v-slot="{ passes }">
              <form @submit.prevent="passes(resetPassword)">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="email"
                  rules="required|min:6"
                  :name="$t('page_resetpassword_form_field_email_label')"
                >
                  <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
                    <b-input
                      v-model.trim="form.email"
                      type="text"
                      placeholder="$t('page_resetpassword_form_field_email_placeholder')"
                      disabled
                    />
                  </b-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="password"
                  rules="required|min:6"
                  :name="$t('page_resetpassword_form_field_password_label')"
                >
                  <b-field
                    :label="$t('page_resetpassword_form_field_password_label')"
                    :type="{ 'is-danger': errors[0] }"
                    :message="errors"
                  >
                    <b-input
                      v-model.trim="form.password"
                      type="password"
                      :placeholder="
                        $t('page_resetpassword_form_field_password_placeholder')
                      "
                      password-reveal
                    />
                  </b-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="password_confirmation"
                  rules="required|confirmed:password"
                  :name="
                    $t(
                      'page_resetpassword_form_field_password_confirmation_label'
                    )
                  "
                >
                  <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
                    <b-input
                      v-model.trim="form.password_confirmation"
                      type="password"
                      :placeholder="
                        $t(
                          'page_resetpassword_form_field_password_confirmation_placeholder'
                        )
                      "
                      password-reveal
                    />
                  </b-field>
                </ValidationProvider>
                <hr />
                <div class="control">
                  <button class="button is-primary">
                    {{ $t('page_resetpassword_form_submit_title') }}
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </template>
          <template v-if="isFormSuccess">
            <p>
              {{
                $t('page_resetpassword_form_success_message', {
                  email: form.email
                })
              }}
            </p>
          </template>
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
  layout: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider,
    PageTitle
  },
  data() {
    return {
      form: {
        email: this.$route.query.email,
        password: '',
        password_confirmation: ''
      },
      isFormSuccess: false
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
    async resetPassword() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$axios.$post('/api/v1/auth/password/reset', {
          email: this.$route.query.email,
          token: this.$route.query.token,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation
        })
        loadingComponent.close()
        this.isFormSuccess = true
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  },
  head() {
    const title = this.$t('page_resetpassword_title')
    const description = this.$t('page_resetpassword_seo_description')
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
