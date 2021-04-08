<template>
  <b-table
    :data="isEmpty ? [] : rankingpointsOfPool"
    :loading="loading"
    striped
    class="table-shadow"
    :aria-next-label="$t('pagination_next_page')"
    :aria-previous-label="$t('pagination_previous_page')"
    :aria-page-label="$t('pagination_page')"
    :aria-current-label="$t('pagination_current_page')"
    :mobile-cards="hasMobileCards"
  >
    <b-table-column
      v-slot="props"
      key="rankingpoints_of_pool_rank"
      field="rank"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.rank }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="rankingpoints_of_pool_name"
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
      key="rankingpoints_of_pool_points"
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
  props: {
    pool: {
      type: Object,
      required: true
    },
    selectedStageNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      api_status: 'PENDING',
      rankingpointsOfPool: [],
      isEmpty: false,
      hasMobileCards: false,
      loading: false
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
        this.$raceApi.getRankingpointsOfPool(
          this.selectedRace.slug,
          this.$route.params.number,
          this.pool.id
        )
      )

      if (err) {
        this.data = []
        this.isEmpty = true
        this.loading = false
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      if (data.length === 0) {
        this.isEmpty = true
      }

      data.forEach((item, index) => {
        item.rank = index + 1
      })

      this.rankingpointsOfPool = data

      this.loading = false
    },
    isUserteamSelected(props) {
      if (props.row.userteam.id === this.loggedInUser.active_userteam.id) {
        this.selected = this.rankingpointsOfPool[props.index]
      }

      return props.row.userteam.name
    }
  }
}
</script>
