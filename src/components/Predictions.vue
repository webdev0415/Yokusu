<template>
  <div>
    <div v-if="api_status === 'PENDING'">
      <ApiStatusPending />
    </div>
    <div v-else-if="api_status === 'ERROR'">
      <ApiStatusError />
    </div>
    <div v-if="api_status === 'SUCCESS'">
      <h2 class="title is-5">
        {{ $t('page_team_points_week_1') }}
      </h2>
      <div class="columns">
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_1) < $moment(new Date())
          "
          class="column"
        >
          <b-table
            :data="predictions_week_1"
            striped
            :mobile-cards="hasMobileCards"
            class="table-shadow"
          >
            <b-table-column
              v-slot="props"
              key="userteam_rider"
              field="name"
              :label="$t('table_th_team_page')"
            >
              {{ getNameOfRider(props.row) }}
              <b-icon
                v-if="props.row.order === 1"
                pack="mdi"
                icon="alpha-c-circle-outline"
                size="is-small"
              />
            </b-table-column>
            <b-table-column
              v-for="stage in getStagesOfWeek(1)"
              v-slot="props"
              :key="`userteam_th_week_1_stage_${stage.id}`"
              :field="`points_stage_${stage.number}`"
              :label="`${stage.number}`"
            >
              <div v-if="selectedRace.current_stage_number >= stage.number">
                {{ getPointsInStage(props.row, stage.number) }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showEndResult"
              v-slot="props"
              key="userteam_th_end_result_week_1"
              field="points_end_result"
              :label="$t('table_th_end_result')"
            >
              <div v-if="selectedRace.is_finished">
                {{ props.row.points_end_result }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showRiderTotal"
              v-slot="props"
              key="userteam_th_rider_total_week_1"
              :label="$t('table_th_total')"
            >
              <div>
                {{
                  getSubtotalOfRider(
                    predictions_week_1,
                    selectedRaceStages,
                    1,
                    props.row.rider_id
                  )
                }}
              </div>
            </b-table-column>
            <template slot="footer">
              <th>
                <div class="th-wrap">
                  {{ $t('table_foot_subtotal') }}:
                  <span v-if="!showRiderTotal">{{ points_week_1 }}</span>
                </div>
              </th>
              <th v-for="stage in getStagesOfWeek(1)" :key="stage.id">
                <div class="th-wrap">
                  {{ getSubtotalOfStage(predictions_week_1, stage) }}
                </div>
              </th>
              <th
                v-if="showEndResult"
                key="userteam_points_end_result_week_1_header"
              >
                <div class="th-wrap">
                  {{ getSubtotalOfEndResult(predictions_week_1) }}
                </div>
              </th>
              <th
                v-if="showRiderTotal"
                key="userteam_points_end_result_week_1_header"
              >
                <div class="th-wrap">
                  {{ points_week_1 }}
                </div>
              </th>
            </template>
          </b-table>
        </div>
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_1) > $moment(new Date())
          "
          class="column"
        >
          <div class="box has-background-white">
            {{ $t('page_team_visible_after') }}
            {{
              $moment(selectedRace.submit_deadline_week_1).format(
                'ddd D MMM @ HH:mm'
              )
            }}
          </div>
        </div>
      </div>
      <hr />
      <h2 class="title is-5">
        {{ $t('page_team_points_week_2') }}
      </h2>
      <div class="columns">
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_2) < $moment(new Date())
          "
          class="column"
        >
          <b-table
            :data="predictions_week_2"
            striped
            :mobile-cards="hasMobileCards"
            class="table-shadow"
          >
            <b-table-column
              v-slot="props"
              key="userteam_rider"
              :label="$t('table_th_team_page')"
              field="name"
            >
              {{ getNameOfRider(props.row) }}
              <b-icon
                v-if="props.row.order === 1"
                pack="mdi"
                icon="alpha-c-circle-outline"
                size="is-small"
              />
            </b-table-column>
            <b-table-column
              v-for="stage in getStagesOfWeek(2)"
              v-slot="props"
              :key="`userteam_th_week_2_stage_${stage.id}`"
              :field="`points_stage_${stage.number}`"
              :label="`${stage.number}`"
            >
              <div v-if="selectedRace.current_stage_number >= stage.number">
                {{ getPointsInStage(props.row, stage.number) }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showEndResult"
              v-slot="props"
              key="userteam_points_end_result_week_2"
              field="points_end_result"
              :label="$t('table_th_end_result')"
            >
              <div v-if="selectedRace.is_finished">
                {{ props.row.points_end_result }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showRiderTotal"
              v-slot="props"
              key="userteam_th_rider_total_week_2"
              :label="$t('table_th_total')"
            >
              <div>
                {{
                  getSubtotalOfRider(
                    predictions_week_2,
                    selectedRaceStages,
                    2,
                    props.row.rider_id
                  )
                }}
              </div>
            </b-table-column>
            <template slot="footer">
              <th>
                <div class="th-wrap">
                  {{ $t('table_foot_subtotal') }}:
                  <span v-if="!showRiderTotal">{{ points_week_2 }}</span>
                </div>
              </th>
              <th v-for="stage in getStagesOfWeek(2)" :key="stage.id">
                <div class="th-wrap">
                  {{ getSubtotalOfStage(predictions_week_2, stage) }}
                </div>
              </th>
              <th
                v-if="showEndResult"
                key="userteam_points_end_result_week_2_header"
              >
                <div class="th-wrap">
                  {{ getSubtotalOfEndResult(predictions_week_2) }}
                </div>
              </th>
              <th
                v-if="showRiderTotal"
                key="userteam_points_end_result_week_1_header"
              >
                <div class="th-wrap">
                  {{ points_week_2 }}
                </div>
              </th>
            </template>
          </b-table>
        </div>
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_2) > $moment(new Date())
          "
          class="column"
        >
          <div class="box has-background-white">
            {{ $t('page_team_visible_after') }}
            {{
              $moment(selectedRace.submit_deadline_week_2).format(
                'ddd D MMM @ HH:mm'
              )
            }}
          </div>
        </div>
      </div>
      <hr />
      <h2 class="title is-5">
        {{ $t('page_team_points_week_3') }}
      </h2>
      <div class="columns">
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_3) < $moment(new Date())
          "
          class="column"
        >
          <b-table
            :data="predictions_week_3"
            striped
            :mobile-cards="hasMobileCards"
            class="table-shadow"
          >
            <b-table-column
              v-slot="props"
              key="userteam_rider"
              :label="$t('table_th_team_page')"
              field="name"
            >
              {{ getNameOfRider(props.row) }}
              <b-icon
                v-if="props.row.order === 1"
                pack="mdi"
                icon="alpha-c-circle-outline"
                size="is-small"
              />
            </b-table-column>
            <b-table-column
              v-for="stage in getStagesOfWeek(3)"
              v-slot="props"
              :key="`userteam_th_week_3_stage_${stage.id}`"
              :field="`points_stage_${stage.number}`"
              :label="`${stage.number}`"
            >
              <div v-if="selectedRace.current_stage_number >= stage.number">
                {{ getPointsInStage(props.row, stage.number) }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showEndResult"
              v-slot="props"
              key="userteam_points_end_result_week_3"
              field="points_end_result"
              :label="$t('table_th_end_result')"
            >
              <div v-if="selectedRace.is_finished">
                {{ props.row.points_end_result }}
              </div>
              <div v-else>
                -
              </div>
            </b-table-column>
            <b-table-column
              v-if="showRiderTotal"
              v-slot="props"
              key="userteam_th_rider_total_week_3"
              :label="$t('table_th_total')"
            >
              <div>
                {{
                  getSubtotalOfRider(
                    predictions_week_3,
                    selectedRaceStages,
                    3,
                    props.row.rider_id
                  )
                }}
              </div>
            </b-table-column>
            <template slot="footer">
              <th>
                <div class="th-wrap">
                  {{ $t('table_foot_subtotal') }}:
                  <span v-if="!showRiderTotal">{{ points_week_3 }}</span>
                </div>
              </th>
              <th v-for="stage in getStagesOfWeek(3)" :key="stage.id">
                <div class="th-wrap">
                  {{ getSubtotalOfStage(predictions_week_3, stage) }}
                </div>
              </th>
              <th
                v-if="showEndResult"
                key="userteam_points_end_result_week_3_header"
              >
                <div class="th-wrap">
                  {{ getSubtotalOfEndResult(predictions_week_3) }}
                </div>
              </th>
              <th
                v-if="showRiderTotal"
                key="userteam_points_end_result_week_1_header"
              >
                <div class="th-wrap">
                  {{ points_week_3 }}
                </div>
              </th>
            </template>
          </b-table>
        </div>
        <div
          v-if="
            $moment(selectedRace.submit_deadline_week_3) > $moment(new Date())
          "
          class="column"
        >
          <div class="box has-background-white">
            {{ $t('page_team_visible_after') }}
            {{
              $moment(selectedRace.submit_deadline_week_3).format(
                'ddd D MMM @ HH:mm'
              )
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'

export default {
  props: {
    userteam: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      api_status: 'PENDING',
      predictions_week_1: [],
      predictions_week_2: [],
      predictions_week_3: [],
      points_week_1: [],
      points_week_2: [],
      points_week_3: [],
      hasMobileCards: false,
      showRiderTotal: true
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    showEndResult() {
      // Try out rule only used in first edition :(
      return this.selectedRace.id === 2
    }
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getPredictionsOfUser(
          this.selectedRace.slug,
          this.userteam.id
        )
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      const predictionsWeek1 = []
      const predictionsWeek2 = []
      const predictionsWeek3 = []
      let pointsWeek1 = 0
      let pointsWeek2 = 0
      let pointsWeek3 = 0

      data.forEach((item, index) => {
        if (item.week === 1) {
          predictionsWeek1[item.order - 1] = item
          pointsWeek1 =
            pointsWeek1 +
            this.getSubtotalOfWeek(item, this.selectedRaceStages, 1)
        }
        if (item.week === 2) {
          predictionsWeek2[item.order - 1] = item
          pointsWeek2 =
            pointsWeek2 +
            this.getSubtotalOfWeek(item, this.selectedRaceStages, 2)
        }
        if (item.week === 3) {
          predictionsWeek3[item.order - 1] = item
          pointsWeek3 =
            pointsWeek3 +
            this.getSubtotalOfWeek(item, this.selectedRaceStages, 3)
        }
      })

      this.predictions_week_1 = predictionsWeek1
      this.predictions_week_2 = predictionsWeek2
      this.predictions_week_3 = predictionsWeek3
      this.points_week_1 = pointsWeek1
      this.points_week_2 = pointsWeek2
      this.points_week_3 = pointsWeek3

      this.api_status = 'SUCCESS'
    },
    getStagesOfWeek(week) {
      const stagesOfWeek = this.selectedRaceStages.filter(
        item => item.week === week
      )
      return stagesOfWeek
    },
    getPointsInStage(item, stageNumber) {
      const entry = ['points_stage_' + stageNumber]
      return item[entry]
    },
    getSubtotalOfWeek(item, stages, week) {
      let points = 0
      for (let index = 0; index < stages.length; index++) {
        if (
          stages[index].week === week &&
          stages[index].id <= this.selectedRace.current_stage_id
        ) {
          const entry = ['points_stage_' + stages[index].number]
          points = points + item[entry]
        }
      }
      if (this.selectedRace.is_finished) {
        points = points + item.points_end_result
      }
      return points
    },
    getSubtotalOfStage(predictions, stage) {
      if (stage.is_finished && stage.id <= this.selectedRace.current_stage_id) {
        let points = 0
        predictions.forEach(item => {
          const entry = ['points_stage_' + stage.number]
          points = points + item[entry]
        })
        return points
      }
      return '-'
    },
    getSubtotalOfRider(predictions, stages, week, riderId) {
      let points = 0
      predictions.forEach(item => {
        for (let index = 0; index < stages.length; index++) {
          if (
            stages[index].week === week &&
            stages[index].id <= this.selectedRace.current_stage_id
          ) {
            if (item.rider_id === riderId) {
              const entry = ['points_stage_' + stages[index].number]
              points = points + item[entry]
            }
          }
        }
        if (item.rider_id === riderId) {
          points = points + item.points_end_result
        }
      })
      return points
    },
    getSubtotalOfEndResult(predictions) {
      if (this.selectedRace.is_finished) {
        let points = 0
        predictions.forEach(item => {
          points = points + item.points_end_result
        })
        return points
      }
      return '-'
    },
    getNameOfRider(object) {
      if (object.rider) {
        return object.rider.first_name + ' ' + object.rider.last_name
      }

      return '-'
    }
  }
}
</script>
