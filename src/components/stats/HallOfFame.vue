<template>
  <b-table
    :data="isEmpty ? [] : hallOfFameList"
    :loading="loading"
    striped
    :default-sort-direction="defaultSortDirection"
    default-sort="position"
    :sort-icon="sortIcon"
    :sort-icon-size="sortIconSize"
    :mobile-cards="hasMobileCards"
    class="table-shadow"
  >
    <b-table-column
      v-slot="props"
      key="hall_of_fame_th_position"
      label="#"
      field="position"
    >
      {{ props.row.position }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="hall_of_fame_th_user"
      :label="$t('table_th_member')"
      field="userprofile.public_name"
    >
      {{ props.row.userprofile.public_name }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      key="hall_of_fame_th_total"
      :label="$t('table_th_points')"
      field="points"
    >
      {{ props.row.points }}
    </b-table-column>

    <template v-if="isEmpty" slot="empty">
      <section class="section">
        <div class="content has-text-grey has-centered-text">
          <p>{{ $t('page_hall_of_fame_no_stats_message') }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'

export default {
  data() {
    return {
      hallOfFameList: [],
      isEmpty: false,
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
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
        this.$fantasyApi.getHallOfFame()
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

      data.forEach((item, index) => {
        item.position = index + 1
        this.hallOfFameList.push(item)
      })

      if (!data.length) {
        this.isEmpty = true
      }

      this.loading = false
    }
  },
  fetchOnServer: false
}
</script>
