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
        key="team"
        :data="isEmpty ? [] : teamJerseyRanking"
        striped
        :mobile-cards="hasMobileCards"
      >
        <b-table-column v-slot="props" key="team_rank" field="rank" label="#">
          {{ props.row.rank }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          key="team_name"
          field="name"
          :label="$t('table_th_team')"
        >
          {{ props.row.team.name }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          key="team_time"
          field="time"
          :label="$t('table_th_time')"
          header-class="th-right"
          cell-class="has-text-right"
        >
          {{ props.row.time }}
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
      teamJerseyRanking: [],
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
            i => i.ranking_title === 'Team'
          )[0].id
        )
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      this.teamJerseyRanking = res.data

      this.api_status = 'SUCCESS'
    }
  }
}
</script>
