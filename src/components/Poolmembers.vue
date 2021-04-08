<template>
  <b-table
    :data="isEmpty ? [] : members"
    :loading="loading"
    striped
    class="table-shadow"
    :mobile-cards="hasMobileCards"
  >
    <b-table-column
      v-slot="props"
      field="position"
      label="#"
      header-class="has-text-white has-background-dark"
    >
      {{ props.row.position }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="name"
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
        {{ props.row.userteam.name }}
      </nuxt-link>
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
          <p>{{ $t('component_poolmembers_no_results_message') }}</p>
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
      members: [],
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
        this.$raceApi.getPoolmembers(
          this.selectedRace.slug,
          this.$route.params.slug
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

      data.forEach((item, index) => {
        item.position = index + 1
        item.points = 0
        this.members.push(item)
      })

      this.$emit('update-members', this.members)

      if (!data.length) {
        this.isEmpty = true
      }

      this.loading = false
    }
  },
  fetchOnServer: false
}
</script>
