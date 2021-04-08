<template>
  <section class="section is-medium">
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <PageTitle>
          {{ $t('page_organizepool_title') }}
        </PageTitle>
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img
                :src="settings.domain.image_url_organizepool"
                :alt="$t('page_organizepool_title')"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p>{{ $t('page_organizepool_description') }}</p>
              <div class="buttons">
                <nuxt-link :to="localePath('login')" class="button is-light">
                  {{ $t('page_organizepool_login_button_text') }}
                </nuxt-link>
                <nuxt-link
                  :to="localePath('register')"
                  class="button is-primary"
                >
                  {{ $t('page_organizepool_register_button_text') }}
                </nuxt-link>
              </div>
            </div>
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
  components: {
    PageTitle
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
    }
  },
  head() {
    const title =
      this.$t('page_organizepool_title') +
      ' - ' +
      this.getSelectedRaceFullName()
    const description = this.$t('page_organizepool_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
