<template>
  <div>
    <div v-if="api_status === 'PENDING'" class="card">
      <ApiStatusPending />
    </div>
    <div v-else-if="api_status === 'ERROR'" class="card">
      <ApiStatusError />
    </div>
    <div v-if="api_status === 'SUCCESS'" class="card">
      <div class="card">
        <div v-if="stage.length !== 0" class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96 mx-0">
                <img
                  :src="stage.stagetype.image_url"
                  :alt="$t(stage.stagetype.name_locale)"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-5">{{ stage.from }} - {{ stage.to }}</p>
              <p class="subtitle is-6">
                <template v-if="stage.stagetype.id !== 1">
                  # {{ stage.number }} /
                </template>
                {{ $moment(stage.date).format('dd D-M') }} /
                {{ stage.distance }} km /
                {{ $t(stage.stagetype.name_locale) }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="stage.length === 0" class="card-content">
          <p>{{ $t('page_home_next_stage_empty') }}</p>
        </div>
      </div>
    </div>
    <p class="mt-3 mb-4">
      <nuxt-link
        :to="
          localePath({
            name: 'race-stages',
            params: {
              race: selectedRace.slug
            }
          })
        "
        class=""
      >
        {{ $t('page_home_link_next_stage_text') }} &raquo;
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
      stage: [],
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
        this.$raceApi.getStagesNext(this.selectedRace.slug)
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      this.stage = data
      this.api_status = 'SUCCESS'
    }
  }
}
</script>
