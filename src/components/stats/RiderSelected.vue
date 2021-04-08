<template>
  <b-table
    :data="riderStats"
    striped
    :default-sort-direction="defaultSortDirection"
    default-sort="selected_total"
    :sort-icon="sortIcon"
    :sort-icon-size="sortIconSize"
    :mobile-cards="hasMobileCards"
    class="table-shadow"
  >
    <b-table-column
      v-slot="props"
      key="stats_rider_selected_th_rider"
      :label="$t('table_th_rider')"
      field="rider.last_name"
    >
      {{ props.row.rider.first_name }} {{ props.row.rider.last_name }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_selected_th_week_1"
      :label="$t('table_th_week_abbr') + 1"
      field="selected_week_1"
      sortable
    >
      {{ props.row.selected_week_1 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_captain_th_week_1"
      :label="$t('table_th_captain_abbr') + 1"
      field="captain_week_1"
      sortable
    >
      {{ props.row.captain_week_1 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_selected_th_week_2"
      :label="$t('table_th_week_abbr') + 2"
      field="selected_week_2"
      sortable
    >
      {{ props.row.selected_week_2 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_captain_th_week_2"
      :label="$t('table_th_captain_abbr') + 2"
      field="captain_week_2"
      sortable
    >
      {{ props.row.captain_week_2 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_selected_th_week_3"
      :label="$t('table_th_week_abbr') + 3"
      field="selected_week_3"
      sortable
    >
      {{ props.row.selected_week_3 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_captain_th_week_3"
      :label="$t('table_th_captain_abbr') + 3"
      field="captain_week_3"
      sortable
    >
      {{ props.row.captain_week_3 }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="stats_rider_selected_th_total"
      :label="$t('table_th_total_abbr')"
      field="selected_total"
      sortable
    >
      {{ props.row.selected_total }}
    </b-table-column>
  </b-table>
</template>

<script>
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
  }
}
</script>
