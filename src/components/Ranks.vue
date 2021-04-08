<template>
  <div>
    <h2 class="title is-5">
      {{ $t('page_team_ranks_over_time') }}
    </h2>
    <div class="columns">
      <div class="column">
        <b-table
          :data="rankingData"
          :mobile-cards="hasMobileCards"
          class="table-shadow"
        >
          <template v-for="column in columns">
            <b-table-column v-slot="props" :key="column.field" v-bind="column">
              <div
                v-for="(value, key, count) in props.row[column.field]"
                :key="`${column.field}${key}${count}`"
              >
                <template v-if="key === 'points'">
                  {{ value }}
                </template>
                <template v-if="key === 'rank'">
                  <template v-if="column.field === 'stage_0' || value === '-'">
                    {{ value }}
                  </template>
                  <template v-else>
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'race-rankinguserteams-number',
                          params: {
                            race: selectedRace.slug,
                            number: column.label
                          },
                          query: {
                            page: getPageNumber(value)
                          }
                        })
                      "
                    >
                      {{ value }}
                    </nuxt-link>
                  </template>
                </template>
              </div>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  props: {
    userteam: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasMobileCards: false
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    columns() {
      const columns = []
      columns.push({
        field: 'stage_0',
        label: ''
      })
      this.selectedRaceStages.forEach(stage => {
        if (stage.number) {
          columns.push({
            field: 'stage_' + stage.number,
            label: stage.number.toString()
          })
        }
      })
      return columns
    },
    rankingData() {
      const points = {}
      const rank = {}

      points.stage_0 = { points: this.$t('table_th_points') }
      rank.stage_0 = { rank: this.$t('table_th_position') }

      this.selectedRaceStages.forEach(stage => {
        if (stage.number) {
          const key = 'stage_' + stage.number
          points[key] = { points: '-' }
          rank[key] = { rank: '-' }

          if (stage.number <= this.selectedRace.current_stage_number) {
            this.userteam.rankings.forEach(item => {
              if (stage.id === item.stage_id) {
                points[key] = { points: item.points }
                rank[key] = { rank: item.rank }
              }
            })
          }
        }
      })

      // TODO: optimize
      const dataArray = []
      dataArray.push(points)
      dataArray.push(rank)
      return dataArray
    }
  },
  methods: {
    getPageNumber(value) {
      return Math.ceil(value / 30)
    }
  }
}
</script>
