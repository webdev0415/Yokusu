<template>
  <b-table
    :data="isEmpty ? [] : userteams"
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
      field="position"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.position }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="name"
      :label="$t('table_th_team')"
      header-class="has-text-white has-background-dark"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'race-userteam-slug',
            params: { race: selectedRace.slug, slug: props.row.slug }
          })
        "
        class="ml-1"
      >
        {{ props.row.name }}
      </nuxt-link>
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="points"
      :label="$t('table_th_points')"
      header-class="has-text-white has-background-dark th-right"
      cell-class="has-text-right"
    >
      {{ props.row.points }}
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
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'

export default {
  data() {
    return {
      userteams: [],
      isEmpty: false,
      hasMobileCards: false,
      total: 0,
      loading: false,
      currentPage: this.$route.query.page
        ? parseInt(this.$route.query.page)
        : 1,
      perPage: 30
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      this.loading = true
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getUserteams(this.selectedRace.slug, {
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

      this.userteams = []
      this.total = meta.total

      if (data.length === 0) {
        this.isEmpty = true
      } else {
        data.forEach((item, index) => {
          item.position = meta.from + index
          item.points = 0
          this.userteams.push(item)
        })
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
