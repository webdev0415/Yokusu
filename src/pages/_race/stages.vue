<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_stages_title') }}
      </PageTitle>
      <template v-if="hasStages">
        <div class="columns">
          <div class="column is-half">
            <b-collapse
              v-for="stage of stages"
              :key="stage.number"
              class="card"
              animation="slide"
              :open="isOpen == stage.number"
              @open="isOpen = stage.number"
            >
              <div slot="trigger" slot-scope="props" class="card-header">
                <div
                  class="card-header-title has-text-weight-normal mb-0 pr-0 is-clearfix"
                >
                  <table class="table is-fullwidth">
                    <tbody>
                      <tr>
                        <td class="px-0">
                          <template v-if="stage.stagetype.id === 1">
                            {{ $t(stage.stagetype.name_locale) }}
                          </template>
                          <template v-else>
                            {{ stage.from }} - {{ stage.to }}<br />
                            <small>
                              # {{ stage.number }} / {{ stage.distance }} km /
                              {{ $t(stage.stagetype.name_locale) }}
                            </small>
                          </template>
                        </td>
                        <td
                          class="px-0 is-vcentered has-text-right"
                          style="width: 70px;"
                        >
                          {{ $moment(stage.date).format('dd D-M') }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a class="card-header-icon pl-0">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content px-0 py-0">
                <template v-if="stage.stagetype.id === 1">
                  <div class="px-4 py-4">{{ stage.from }}</div>
                </template>
                <template v-else>
                  <figure class="image">
                    <img :src="stage.image_url" :alt="stage.number" />
                  </figure>
                </template>
              </div>
            </b-collapse>
          </div>
          <div v-if="selectedRace.image_url !== null" class="column is-half">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img :src="selectedRace.image_url" :alt="selectedRace.name" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!hasStages">
        <div class="box has-background-white">
          <div class="content">
            {{ $t('page_stages_no_stages_message') }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch, getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'

export default {
  components: {
    PageTitle
  },
  async asyncData({ app, params, error, $sentry, $moment }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getStages(params.race)
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    let containsStages = true
    let isCurrentStage = 1

    if (data.length === 0) {
      containsStages = false
    } else {
      data.forEach(stage => {
        if (stage.date === $moment(new Date()).format('YYYY-MM-DD')) {
          isCurrentStage = stage.number
        }
      })
    }

    return {
      hasStages: containsStages,
      stages: data,
      isOpen: isCurrentStage
    }
  },
  data() {
    return {
      hasStages: true,
      stages: [],
      isOpen: 1
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    }
  },
  head() {
    const title =
      this.$t('page_stages_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_stages_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
