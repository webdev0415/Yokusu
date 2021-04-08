<template>
  <div class="container">
    <PageTitle>
      {{ $t('navbar_item_admin_users') }}
    </PageTitle>
    <AdminUsers />
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'
import AdminUsers from '@/components/admin/AdminUsers'

export default {
  middleware: ['authRequired', 'adminRedirect'],
  layout: 'admin',
  components: {
    PageTitle,
    AdminUsers
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
