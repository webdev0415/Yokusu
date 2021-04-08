<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box has-background-white">
          <PageTitle>
            {{ $t('page_register_title') }}
          </PageTitle>
          <hr />
          <template v-if="settings.user_limit_reached">
            <b-notification :closable="isClosable">
              {{
                $t('page_register_user_limited_reached_notification', {
                  email: settings.domain.contact_email
                })
              }}
            </b-notification>
          </template>
          <template v-if="!settings.user_limit_reached">
            <template v-if="!isFormSuccess">
              <b-notification
                v-if="settings.domain.allowed_email_domains"
                :closable="isClosable"
              >
                {{
                  $t('page_register_allowed_email_domains_notification', {
                    domains: settings.domain.allowed_email_domains
                  })
                }}
              </b-notification>
              <ValidationObserver ref="observer" v-slot="{ passes }">
                <form novalidate @submit.prevent="passes(registerUser)">
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="email"
                    rules="required|email"
                    :name="$t('page_register_form_field_email_label')"
                  >
                    <b-field
                      :label="$t('page_register_form_field_email_label')"
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.email"
                        type="email"
                        :placeholder="
                          $t('page_register_form_field_email_placeholder')
                        "
                      />
                    </b-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="password"
                    rules="required|min:6"
                    :name="$t('page_register_form_field_password_label')"
                  >
                    <b-field
                      :label="$t('page_register_form_field_password_label')"
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.password"
                        type="password"
                        :placeholder="
                          $t('page_register_form_field_password_placeholder')
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
                      $t('page_register_form_field_password_confirmation_label')
                    "
                  >
                    <b-field
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.password_confirmation"
                        type="password"
                        :placeholder="
                          $t(
                            'page_register_form_field_password_confirmation_placeholder'
                          )
                        "
                        password-reveal
                      />
                    </b-field>
                  </ValidationProvider>
                  <hr />
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="userprofile.first_name"
                    rules="required|min:3|max:40"
                    :name="$t('page_register_form_field_first_name_label')"
                  >
                    <b-field
                      :label="$t('page_register_form_field_first_name_label')"
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.userprofile.first_name"
                        type="text"
                        :placeholder="
                          $t('page_register_form_field_first_name_placeholder')
                        "
                      />
                    </b-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="userprofile.last_name"
                    rules="required|min:3|max:40"
                    :name="$t('page_register_form_field_last_name_label')"
                  >
                    <b-field
                      :label="$t('page_register_form_field_last_name_label')"
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.userprofile.last_name"
                        type="text"
                        :placeholder="
                          $t('page_register_form_field_last_name_placeholder')
                        "
                      />
                    </b-field>
                  </ValidationProvider>
                  <hr />
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="fantasy_userteam.name"
                    rules="required|min:3|max:40"
                    :name="$t('page_register_form_field_team_name_label')"
                  >
                    <b-field
                      :label="$t('page_register_form_field_team_name_label')"
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-input
                        v-model.trim="form.fantasy_userteam.name"
                        type="text"
                        :placeholder="
                          $t('page_register_form_field_team_name_placeholder')
                        "
                      />
                    </b-field>
                  </ValidationProvider>
                  <hr />
                  <ValidationProvider
                    v-slot="{ errors }"
                    vid="approval"
                    rules="required"
                    :name="$t('page_register_form_field_terms_label')"
                  >
                    <b-field
                      :type="{ 'is-danger': errors[0] }"
                      :message="errors"
                    >
                      <b-checkbox v-model="form.approval">
                        {{ $t('page_register_form_field_terms_placeholder') }}
                        <a class="is-primary" @click="openPrivacyModal()">
                          {{
                            $t('page_register_form_field_terms_modal_privacy')
                          }}
                        </a>
                        &
                        <a class="is-primary" @click="openTermsModal()">
                          {{ $t('page_register_form_field_terms_modal_terms') }}
                        </a>
                      </b-checkbox>
                    </b-field>
                  </ValidationProvider>
                  <br />
                  <div class="control">
                    <button class="button is-primary">
                      {{ $t('page_register_form_submit_title') }}
                    </button>
                  </div>
                </form>
              </ValidationObserver>
              <br />
              <p>
                {{ $t('page_register_login_teaser_title') }}
                <nuxt-link :to="localePath('login')">
                  {{ $t('page_register_login_teaser_link_title') }}
                </nuxt-link>
              </p>
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
                        $t('page_register_form_success_message', {
                          email: form.email
                        })
                      }}
                    </p>
                  </div>
                </div>
              </article>
            </template>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { settingsStateMapGetter } from '@/services/settingsService'
import PageTitle from '@/components/PageTitle'
import { getMetaTags } from '@/utils'
// import { withCatch } from '@/utils'
import PrivacyModal from '@/components/modals/PrivacyModal'
import TermsModal from '@/components/modals/TermsModal'

export default {
  name: 'Register',
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
        password: '',
        password_confirmation: '',
        userprofile: {
          first_name: '',
          last_name: ''
        },
        fantasy_userteam: {
          name: ''
        },
        approval: ''
      },
      isFormSuccess: false,
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
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    openPrivacyModal() {
      this.$buefy.modal.open({
        parent: this,
        component: PrivacyModal,
        hasModalCard: true,
        trapFocus: true
      })
    },
    openTermsModal() {
      this.$buefy.modal.open({
        parent: this,
        component: TermsModal,
        hasModalCard: true,
        trapFocus: true
      })
    },
    async registerUser() {
      const loadingComponent = this.$buefy.loading.open()
      /*  const { error: err } = await withCatch(() => registerApi.post(this.form))
      //   if (err) {
      //     this.$refs.observer.setErrors(err.response.data.errors)
      //     return
      //   } else {
      //     this.isFormSuccess = true
      //   }

      //   loadingComponent.close()
      // }
      */
      try {
        await this.$axios.$post('/api/v1/auth/register', this.form)
        loadingComponent.close()
        this.$gtag('event', 'conversion', {
          send_to: 'AW-1026927836/5aMqCPS7meEBENzZ1ukD'
        })
        this.isFormSuccess = true
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  },
  head() {
    const title = this.$t('page_register_title')
    const description = this.$t('page_register_seo_description')
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
