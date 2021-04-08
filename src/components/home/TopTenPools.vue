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
        :data="isEmpty ? [] : poolsTopTen"
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
          :label="$t('table_th_pool')"
          header-class="has-text-white has-background-dark"
        >
          {{ props.row.name }}
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
              <p>{{ $t('component_pools_no_results_message') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <p class="mt-3 mb-4">
      <nuxt-link
        :to="
          localePath({
            name: 'race-pools',
            params: {
              race: selectedRace.slug
            }
          })
        "
        class=""
      >
        {{ getPooltype }} &raquo;
      </nuxt-link>
    </p>
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
      poolsTopTen: [],
      isEmpty: false,
      hasMobileCards: false,
      api_status: 'PENDING'
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    getPooltype() {
      if (this.settings.pooltype.name_locale_plural) {
        return this.$t('page_home_link_pooltypes_text', {
          pooltype: this.$t(this.settings.pooltype.name_locale_plural)
        })
      }

      return this.$t('page_home_link_pools_text')
    }
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getPoolsTopTen(this.selectedRace.slug)
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      const poolsTopTen = []

      if (data.length === 0) {
        this.isEmpty = true
      } else {
        data.forEach((item, index) => {
          item.position = index + 1
          item.points = 0
          poolsTopTen.push(item)
        })
      }

      this.poolsTopTen = poolsTopTen
      this.api_status = 'SUCCESS'
    }
  }
}
</script>
