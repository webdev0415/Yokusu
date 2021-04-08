<template>
  <div>
    <div v-if="api_status === 'PENDING'">
      <ApiStatusPending />
    </div>
    <div v-else-if="api_status === 'ERROR'">
      <ApiStatusError />
    </div>
    <div v-if="api_status === 'SUCCESS'">
      <b-table
        key="climber"
        :data="isEmpty ? [] : climberJerseyRanking"
        striped
        :mobile-cards="hasMobileCards"
      >
        <b-table-column
          v-slot="props"
          key="climber_rank"
          field="rank"
          label="#"
        >
          {{ props.row.rank }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          key="climber_name"
          field="name"
          :label="$t('table_th_rider')"
        >
          <span class="is-hidden-desktop">{{ props.row.rider.last_name }}</span>
          <span class="is-hidden-touch">{{ props.row.rider.full_name }}</span>
        </b-table-column>
        <b-table-column
          v-slot="props"
          key="yellow_jersey_team"
          field="team.name"
          :label="$t('table_th_team')"
        >
          <span class="is-hidden-desktop">{{ props.row.rider.team.abbr }}</span>
          <span class="is-hidden-touch">{{ props.row.rider.team.name }}</span>
        </b-table-column>
        <b-table-column
          v-slot="props"
          key="climber_points"
          field="points"
          :label="$t('table_th_points')"
          header-class="th-right"
          cell-class="has-text-right"
        >
          {{ props.row.points }}
        </b-table-column>
        <template v-if="isEmpty" slot="empty">
          <section class="section">
            <div class="content has-text-grey has-centered-text">
              <p>{{ $t('component_racerankings_no_results_message') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import ApiStatusPending from '@/components/home/ApiStatusPending'
import ApiStatusError from '@/components/home/ApiStatusError'
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'

export default {
  components: {
    ApiStatusPending,
    ApiStatusError
  },
  data() {
    return {
      climberJerseyRanking: [],
      isEmpty: false,
      hasMobileCards: false,
      api_status: 'PENDING'
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
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getRaceRankings(
          this.selectedRace.slug,
          this.$route.params.number,
          this.selectedRace.rankingtypes.filter(
            i => i.ranking_title === 'Climber'
          )[0].id
        )
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      this.climberJerseyRanking = res.data

      this.api_status = 'SUCCESS'
    }
  }
}
</script>
