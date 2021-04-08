<template>
  <b-table
    :data="riderStats"
    striped
    :default-sort-direction="defaultSortDirection"
    default-sort="points_total"
    :sort-icon="sortIcon"
    :sort-icon-size="sortIconSize"
    :mobile-cards="hasMobileCards"
    class="table-shadow"
  >
    <b-table-column
      v-slot="props"
      key="stats_rider_points_th_rider"
      :label="$t('table_th_rider')"
      field="rider.last_name"
    >
      {{ props.row.rider.first_name }} {{ props.row.rider.last_name }}
    </b-table-column>
    <b-table-column
      v-for="stage in getStages()"
      v-slot="props"
      :key="`stats_rider_points_stage_th_${stage.id}`"
      :field="`points_stage_${stage.number}`"
      :label="`${stage.number}`"
      sortable
    >
      <div v-if="selectedRace.current_stage_number >= stage.number">
        {{ getPointsInStage(props.row, stage.number) }}
      </div>
      <div v-else>
        -
      </div>
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_points_th_week_1"
      :label="$t('table_th_week_abbr') + 1"
      field="points_week_1"
      sortable
    >
      {{ props.row.points_week_1 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_points_th_week_2"
      :label="$t('table_th_week_abbr') + 2"
      field="points_week_2"
      sortable
    >
      {{ props.row.points_week_2 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_points_th_week_3"
      :label="$t('table_th_week_abbr') + 3"
      field="points_week_3"
      sortable
    >
      {{ props.row.points_week_3 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_points_th_total"
      :label="$t('table_th_total_abbr')"
      field="points_total"
      sortable
    >
      {{ props.row.points_total }}
    </b-table-column>
  </b-table>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  props: {
    riderStats: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      hasMobileCards: false
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  methods: {
    getStages() {
      const stages = this.selectedRaceStages.filter(item => item.week)
      return stages
    },
    getPointsInStage(item, stageNumber) {
      const entry = ['points_stage_' + stageNumber]
      return item[entry]
    }
  }
}
</script>
