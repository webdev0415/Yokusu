<template>
  <div class="container">
    <PageTitle>
      Admin
    </PageTitle>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'

export default {
  middleware: ['authRequired', 'adminRedirect'],
  layout: 'admin',
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
    }
  },
  head() {
    const title = this.$t('page_home_seo_title')
    const description = ''
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
