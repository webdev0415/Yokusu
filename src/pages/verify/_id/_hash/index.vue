<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box has-background-white">
          <div class="content">
            <PageTitle>
              {{ $t('page_verify_title') }}
            </PageTitle>
            <template v-if="api_status === 'PENDING'">
              <b-loading :is-full-page="false" :active="true" />
            </template>
            <template v-else-if="api_status === 'ERROR'">
              <article class="media">
                <figure class="media-left">
                  <p><b-icon icon="alert-circle-outline" size="is-medium" /></p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>{{ $t('page_verify_failure_message') }}</p>
                  </div>
                </div>
              </article>
            </template>
            <template v-if="api_status === 'SUCCESS'">
              <article class="media">
                <figure class="media-left">
                  <p><b-icon icon="check-outline" size="is-medium" /></p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>{{ $t('page_verify_success_message') }}</p>
                  </div>
                </div>
              </article>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'

export default {
  middleware: 'authRedirect',
  layout: 'auth',
  components: {
    PageTitle
  },
  data() {
    return {
      api_status: 'PENDING'
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  created() {
    // TODO: refactor withCatch and call from auth api
    const { id, hash } = this.$route.params
    const { expires, signature } = this.$route.query

    this.$axios
      .$get(
        `/api/v1/auth/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
      )
      .then(data => {
        if (
          data.message === 'Already verified' ||
          data.message === 'Successfully verified'
        ) {
          this.api_status = 'SUCCESS'
        } else {
          this.api_status = 'ERROR'
        }
        this.message = data.message
      })
      .catch(err => {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
      })
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    }
  },
  head() {
    const title = this.$t('page_verify_title')
    const description = this.$t('page_verify_seo_description', {
      title: this.settings.domain.title
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
