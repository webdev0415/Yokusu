<template>
  <div>
    <div v-if="api_status === 'PENDING'" class="card">
      <ApiStatusPending />
    </div>
    <div v-else-if="api_status === 'ERROR'" class="card">
      <ApiStatusError />
    </div>
    <div v-if="api_status === 'SUCCESS'" class="card">
      <b-table
        :data="isEmpty ? [] : raceRankinguserteamsTopTen"
        striped
        class="table-shadow"
        :mobile-cards="hasMobileCards"
      >
        <b-table-column
          v-slot="props"
          field="rank"
          label="#"
          header-class="has-text-white has-background-dark"
        >
          {{ props.row.rank }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="name"
          :label="$t('table_th_team')"
          header-class="has-text-white has-background-dark"
        >
          {{ props.row.userteam.name }}
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
              <p>{{ $t('component_rankinguserteams_no_results_message') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <p class="mt-3 mb-4">
      <nuxt-link
        :to="
          localePath({
            name: 'race-rankinguserteams-number',
            params: {
              race: selectedRace.slug,
              number: selectedRace.current_stage_number
            }
          })
        "
        class=""
      >
        {{ $t('page_home_link_rankings_text') }} &raquo;
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'
import ApiStatusPending from '@/components/home/ApiStatusPending'
import ApiStatusError from '@/components/home/ApiStatusError'

export default {
  components: {
    ApiStatusPending,
    ApiStatusError
  },
  data() {
    return {
      raceRankinguserteamsTopTen: [],
      isEmpty: false,
      hasMobileCards: false,
      api_status: 'PENDING'
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  created() {
    this.loadAsyncData(this.app)
  },
  methods: {
    async loadAsyncData(app) {
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getRankinguserteamsTopTen(
          this.selectedRace.slug,
          this.selectedRace.current_stage_number
        )
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      if (data.length === 0) {
        this.isEmpty = true
      } else {
        this.raceRankinguserteamsTopTen = data
      }

      this.api_status = 'SUCCESS'
    }
  }
}
</script>
