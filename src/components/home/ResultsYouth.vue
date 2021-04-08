<template>
  <b-table :data="ranking" striped :mobile-cards="hasMobileCards">
    <b-table-column
      v-slot="props"
      key="results_youth_rank"
      field="rank"
      label="#"
    >
      {{ props.row.rank }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="results_youth_name"
      field="name"
      :label="$t('table_th_rider')"
    >
      {{
        props.row.rider.first_name.charAt(0) + '. ' + props.row.rider.last_name
      }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="results_youth_time"
      field="time"
      :label="$t('table_th_time')"
      header-class="th-right"
      cell-class="has-text-right"
    >
      {{ props.row.time }}
    </b-table-column>
  </b-table>
</template>

<script>
export default {
  props: {
    ranking: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEmpty: false,
      hasMobileCards: false
    }
  }
}
</script>
