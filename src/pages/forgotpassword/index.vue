<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box has-background-white">
          <PageTitle>
            {{ $t('page_forgotpassword_title') }}
          </PageTitle>
          <hr />
          <template v-if="!isFormSuccess">
            <p>{{ $t('page_forgotpassword_subtitle') }}</p>
            <br />
            <ValidationObserver ref="observer" v-slot="{ passes }">
              <form @submit.prevent="passes(forgotPassword)">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="email"
                  rules="required|email"
                  :name="$t('page_forgotpassword_form_field_email_label')"
                >
                  <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
                    <b-input
                      v-model.trim="form.email"
                      type="email"
                      :placeholder="
                        $t('page_forgotpassword_form_field_email_placeholder')
                      "
                    />
                  </b-field>
                </ValidationProvider>
                <hr />
                <div class="control">
                  <button class="button is-primary">
                    {{ $t('page_forgotpassword_form_submit_title') }}
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </template>
          <template v-if="isFormSuccess">
            <article class="media">
              <figure class="media-left">
                <p><b-icon icon="email-outline" size="is-medium" /></p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    {{
                      $t('page_forgotpassword_form_success_message', {
                        email: form.email
                      })
                    }}
                  </p>
                </div>
              </div>
            </article>
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
        email: ''
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
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    async forgotPassword() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$axios.$post('/api/v1/auth/password/forgot', this.form)
        loadingComponent.close()
        this.isFormSuccess = true
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  },
  head() {
    const title = this.$t('page_forgotpassword_title')
    const description = this.$t('page_forgotpassword_seo_description', {
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
