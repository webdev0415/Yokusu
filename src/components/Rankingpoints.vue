<template>
  <b-table
    :data="isEmpty ? [] : rankingpoints"
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
    :selected.sync="selected"
    @page-change="onPageChange"
  >
    <b-table-column
      v-slot="props"
      key="rankingpoints_rank"
      field="rank"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.rank }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="rankingpoints_name"
      field="userteam.name"
      :label="$t('table_th_team')"
      header-class="has-text-white has-background-dark"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'race-userteam-slug',
            params: { race: selectedRace.slug, slug: props.row.userteam.slug }
          })
        "
        class="ml-1"
      >
        <template v-if="isAuthenticated">
          {{ isUserteamSelected(props) }}
        </template>
        <template v-if="!isAuthenticated">
          {{ props.row.userteam.name }}
        </template>
      </nuxt-link>
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="rankingpoints_points"
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
          <p>{{ $t('component_rankingpoints_no_results_message') }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { withCatch } from '@/utils'

export default {
  data() {
    return {
      api_status: 'PENDING',
      rankingpoints: [],
      selected: {},
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
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter()
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      this.loading = true
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getRankingpoints(
          this.selectedRace.slug,
          this.$route.params.number,
          {
            page: this.currentPage,
            per_page: this.perPage
          }
        )
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

      if (data.length === 0) {
        this.isEmpty = true
      }

      this.total = meta.total
      this.rankingpoints = data

      this.loading = false
    },
    isUserteamSelected(props) {
      if (props.row.userteam.id === this.loggedInUser.active_userteam.id) {
        this.selected = this.rankingpoints[props.index]
      }

      return props.row.userteam.name
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
