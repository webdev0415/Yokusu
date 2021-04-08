<template>
  <b-table
    :data="isEmpty ? [] : rankinguserteamsOfPool"
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
      key="rankinguserteams_of_pool_rank"
      field="rank"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.rank }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="rankinguserteams_of_pool_name"
      field="userteam.name"
      :label="$t('table_th_team')"
      header-class="has-text-white has-background-dark"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'race-userteam-slug',
            params: {
              race: selectedRace.slug,
              slug: props.row.userteam.slug
            }
          })
        "
        class="ml-1"
      >
        {{ props.row.userteam.name }}
      </nuxt-link>
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="rankinguserteams_of_pool_points"
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
          <p>{{ $t('component_rankinguserteams_no_results_message') }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
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
      rankinguserteamsOfPool: [],
      isEmpty: false,
      hasMobileCards: false,
      loading: false
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
        this.$raceApi.getRankinguserteamsOfPool(
          this.selectedRace.slug,
          this.selectedStageNumber,
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

      this.rankinguserteamsOfPool = data

      this.loading = false
    }
  }
}
</script>
