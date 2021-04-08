<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_rules_title') }}
      </PageTitle>
      <div class="columns">
        <div class="column">
          <div class="box has-background-white">
            <div class="content">
              <template v-if="hasRules">
                <h2 class="title is-5">
                  {{ $t('page_rules_introduction_title') }}
                </h2>
                <p>
                  {{
                    $t('page_rules_introduction_description', {
                      title: settings.domain.title,
                      race: rulesRace
                    })
                  }}
                </p>
                <hr />
                <h2 class="title is-5">
                  {{ $t('page_rules_title') }}
                </h2>
                <ol>
                  <li>
                    {{
                      $t('page_rules_myprediction_bullet_1', {
                        deadlineWeek1: getDeadline(
                          selectedRace.submit_deadline_week_1
                        ),
                        deadlineWeek2: getDeadline(
                          selectedRace.submit_deadline_week_2
                        ),
                        deadlineWeek3: getDeadline(
                          selectedRace.submit_deadline_week_3
                        )
                      })
                    }}
                  </li>
                  <li>{{ $t('page_rules_myprediction_bullet_2') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_3') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_4') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_5') }}</li>
                  <li v-if="selectedRace.id > 2">
                    {{ $t('page_rules_myprediction_bullet_6') }}
                  </li>
                  <li>{{ $t('page_rules_myprediction_bullet_7') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_8') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_9') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_10') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_11') }}</li>
                  <li v-if="rulesCaptainFactor.length === 0">
                    {{ $t('page_rules_myprediction_bullet_12') }}
                  </li>
                  <li>{{ $t('page_rules_myprediction_bullet_13') }}</li>
                  <li>{{ $t('page_rules_myprediction_bullet_14') }}</li>
                </ol>
                <hr />
                <h2 class="title is-5">
                  {{ $t('page_rules_points_title') }}
                </h2>
                <template v-if="rulesPerStageResult.length !== 0">
                  <b-table
                    :data="rulesPerStageResult"
                    striped
                    :mobile-cards="hasMobileCards"
                  >
                    <b-table-column
                      v-slot="props"
                      field="name"
                      :label="$t('page_rules_table_per_stage_result_header')"
                      header-class="has-text-white has-background-dark"
                    >
                      {{ $t(props.row.rule.rule_locale) }}
                    </b-table-column>
                    <b-table-column
                      v-slot="props"
                      field="points"
                      :label="$t('page_rules_table_header_points')"
                      header-class="has-text-white has-background-dark th-right"
                      cell-class="has-text-right"
                    >
                      {{ props.row.points }}
                    </b-table-column>
                  </b-table>
                </template>
                <template v-if="rulesPerStageRanking.length !== 0">
                  <br />
                  <b-table
                    :data="rulesPerStageRanking"
                    striped
                    :mobile-cards="hasMobileCards"
                  >
                    <b-table-column
                      v-slot="props"
                      field="name"
                      :label="$t('page_rules_table_per_stage_ranking_header')"
                      header-class="has-text-white has-background-dark"
                    >
                      {{ $t(props.row.rule.rule_locale) }}
                    </b-table-column>
                    <b-table-column
                      v-slot="props"
                      field="points"
                      :label="$t('page_rules_table_header_points')"
                      header-class="has-text-white has-background-dark th-right"
                      cell-class="has-text-right"
                    >
                      {{ props.row.points }}
                    </b-table-column>
                  </b-table>
                </template>
                <template v-if="rulesEndResult.length !== 0">
                  <br />
                  <b-table
                    :data="rulesEndResult"
                    striped
                    :mobile-cards="hasMobileCards"
                  >
                    <b-table-column
                      v-slot="props"
                      field="name"
                      :label="$t('page_rules_table_end_result_header')"
                      header-class="has-text-white has-background-dark"
                    >
                      {{ $t(props.row.rule.rule_locale) }}
                    </b-table-column>
                    <b-table-column
                      v-slot="props"
                      field="points"
                      :label="$t('page_rules_table_header_points')"
                      header-class="has-text-white has-background-dark th-right"
                      cell-class="has-text-right"
                    >
                      {{ props.row.points }}
                    </b-table-column>
                  </b-table>
                  <br />
                  <small>
                    (*) {{ $t('page_rules_table_end_result_subscript') }}
                  </small>
                </template>
                <template v-if="rulesCaptainFactor.length !== 0">
                  <br />
                  <b-table
                    :data="rulesCaptainFactor"
                    striped
                    :mobile-cards="hasMobileCards"
                  >
                    <b-table-column
                      v-slot="props"
                      field="name"
                      :label="$t('page_rules_table_captain_factor_header')"
                      header-class="has-text-white has-background-dark"
                    >
                      {{ $t(props.row.rule.rule_locale) }}
                    </b-table-column>
                    <b-table-column
                      v-slot="props"
                      field="points"
                      :label="$t('page_rules_table_header_factor')"
                      header-class="has-text-white has-background-dark th-right"
                      cell-class="has-text-right"
                    >
                      x {{ props.row.points }}
                    </b-table-column>
                  </b-table>
                </template>
              </template>
              <template v-if="!hasRules">
                {{ $t('page_rules_no_rules_message') }}
              </template>
            </div>
          </div>
        </div>
      </div>
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
  async asyncData({ app, params, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      app.$raceApi.getRules(params.race, params.slug)
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    const perStageResult = []
    const perStageRanking = []
    const endResult = []
    const captainFactor = []

    let containsRules = true
    let race = ''

    if (data.length === 0) {
      containsRules = false
    } else {
      data.forEach((item, index) => {
        if (race === '') {
          race = item.race.name
        }
        if (item.rule.type === 'per_stage_result') {
          perStageResult.push(item)
        }
        if (item.rule.type === 'per_stage_ranking') {
          perStageRanking.push(item)
        }
        if (item.rule.type === 'end_result') {
          endResult.push(item)
        }
        if (item.rule.type === 'captain_factor') {
          captainFactor.push(item)
        }
      })
    }

    return {
      hasRules: containsRules,
      rulesPerStageResult: perStageResult,
      rulesPerStageRanking: perStageRanking,
      rulesEndResult: endResult,
      rulesCaptainFactor: captainFactor,
      rulesRace: race
    }
  },
  data() {
    return {
      hasRules: true,
      rulesPerStageResult: [],
      rulesPerStageRanking: [],
      rulesEndResult: [],
      rulesCaptainFactor: [],
      rulesRace: '',
      hasMobileCards: false
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
    },
    getDeadline(date) {
      return this.$moment(date).format('dddd D MMMM Y @ HH:mm')
    }
  },
  head() {
    const title =
      this.$t('page_rules_title') + ' - ' + this.getSelectedRaceFullName()
    const description = this.$t('page_rules_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
