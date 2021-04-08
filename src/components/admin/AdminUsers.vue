<template>
  <b-table
    :data="isEmpty ? [] : adminUsers"
    :loading="loading"
    striped
    class="table-shadow"
    paginated
    backend-pagination
    :total="total"
    :current-page="currentPage"
    :per-page="perPage"
    :aria-next-label="$t('pagination_next_page')"
    :aria-previous-label="$t('pagination_previous_page')"
    :aria-page-label="$t('pagination_page')"
    :aria-current-label="$t('pagination_current_page')"
    :mobile-cards="hasMobileCards"
    @page-change="onPageChange"
  >
    <b-table-column
      v-slot="props"
      field="id"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.id }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="name"
      :label="$t('table_th_team')"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.email }}
    </b-table-column>
    <template v-if="isEmpty" slot="empty">
      <section class="section">
        <div class="content has-text-grey has-centered-text">
          <p>{{ $t('component_userteams_no_results_message') }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import { withCatch } from '@/utils'

export default {
  data() {
    return {
      adminUsers: [],
      isEmpty: false,
      hasMobileCards: false,
      total: 0,
      loading: false,
      currentPage: this.$route.query.page
        ? parseInt(this.$route.query.page)
        : 1,
      perPage: 50
    }
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      this.loading = true
      const { response: res, error: err } = await withCatch(() =>
        this.$adminApi.getAdminUsers({
          page: this.currentPage,
          per_page: this.perPage
        })
      )

      if (err) {
        this.data = []
        this.isEmpty = true
        this.total = 0
        this.loading = false
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data, meta } = res

      this.total = meta.total

      if (data.length === 0) {
        this.isEmpty = true
      } else {
        this.adminUsers = data
      }

      this.loading = false
    },
    onPageChange(toPage) {
      this.currentPage = toPage
      this.$router.push({
        query: {
          ...this.$route.query,
          page: toPage
        }
      })
      this.loadAsyncData()
    }
  }
}
</script>
