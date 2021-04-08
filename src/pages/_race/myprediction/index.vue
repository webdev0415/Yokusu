<template>
  <section class="section">
    <div class="container">
      <PageTitle>
        {{ $t('page_myprediction_title') }}
      </PageTitle>
      <template v-if="isAuthenticated">
        <template v-if="selectedRace.is_finished">
          <div class="box has-background-white">
            <div class="content">
              <p>
                {{
                  $t('page_myprediction_race_is_finished', {
                    race: selectedRace.name + ' ' + selectedRace.year
                  })
                }}
              </p>
            </div>
          </div>
        </template>
        <template v-else-if="myUserteam === null">
          <div class="box has-background-white">
            <div class="content">
              <p>{{ $t('page_myprediction_no_userteam') }}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <template v-if="ridersEmpty">
            <b-message type="is-primary">
              <strong>{{ $t('page_myprediction_announcement_intro') }}</strong>
              {{ $t('page_myprediction_announcement') }}
            </b-message>
          </template>
          <div class="columns">
            <div class="column is-one-third-desktop">
              <h2 class="title is-5 mb-2">
                {{ $t('page_myprediction_riders_week_1') }}
              </h2>
              <p class="mb-4">
                <small
                  >{{ $t('page_myprediction_deadline') }}:
                  {{
                    $moment(selectedRace.submit_deadline_week_1).format(
                      'ddd D MMM @ HH:mm'
                    )
                  }}</small
                >
              </p>
              <b-table
                class="table-shadow"
                :class="{
                  disabled:
                    $moment(selectedRace.submit_deadline_week_1) <
                    $moment(new Date())
                }"
                :data="team_week_1"
                :mobile-cards="hasMobileCards"
                :loading="isLoading"
                draggable
                @dragstart="dragstart($event, 'predictions_week_1', 1)"
                @drop="drop($event, 'predictions_week_1', 1)"
                @dragover="dragover"
                @dragleave="dragleave"
              >
                <b-table-column v-slot="props" label="" width="40" numeric>
                  {{ props.row.start_number }}
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_rider')">
                  <span :class="{ 'is-withdrawn': props.row.is_withdrawn }">
                    {{ getValueOrPlaceholder(props.row, 'last_name') }}
                  </span>
                  <b-icon
                    v-if="props.index === 0"
                    pack="mdi"
                    icon="alpha-c-circle-outline"
                    size="is-small"
                  />
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_team')">
                  {{ getValueOrPlaceholder(props.row, 'team.abbr') }}
                </b-table-column>

                <b-table-column
                  v-if="
                    $moment(selectedRace.submit_deadline_week_1) >
                      $moment(new Date())
                  "
                  v-slot="props"
                  width="68"
                >
                  <div class="block">
                    <b-icon
                      v-if="props.row.id && props.index !== 0"
                      pack="mdi"
                      icon="alpha-c-circle-outline"
                      size="is-small"
                      @click.native="
                        showMakeRiderCaptainModal(
                          'predictions_week_1',
                          props.index,
                          1,
                          props.row.last_name
                        )
                      "
                    />
                    <b-icon
                      v-if="props.row.id"
                      pack="mdi"
                      icon="close"
                      size="is-small"
                      @click.native="
                        showRemoveRiderFromWeekModal(
                          'predictions_week_1',
                          props.index,
                          1,
                          props.row.last_name
                        )
                      "
                    />
                  </div>
                </b-table-column>
              </b-table>
            </div>
            <div class="column is-one-third-desktop">
              <h2 class="title is-5 mb-2">
                {{ $t('page_myprediction_riders_week_2') }}
              </h2>
              <p class="mb-4">
                <small
                  >{{ $t('page_myprediction_deadline') }}:
                  {{
                    $moment(selectedRace.submit_deadline_week_2).format(
                      'ddd D MMM @ HH:mm'
                    )
                  }}</small
                >
              </p>
              <b-table
                class="table-shadow"
                :class="{
                  disabled:
                    $moment(selectedRace.submit_deadline_week_2) <
                    $moment(new Date())
                }"
                :data="team_week_2"
                :mobile-cards="hasMobileCards"
                :loading="isLoading"
                draggable
                @dragstart="dragstart($event, 'predictions_week_2', 2)"
                @drop="drop($event, 'predictions_week_2', 2)"
                @dragover="dragover"
                @dragleave="dragleave"
              >
                <b-table-column v-slot="props" label="" width="40" numeric>
                  {{ props.row.start_number }}
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_rider')">
                  <span :class="{ 'is-withdrawn': props.row.is_withdrawn }">
                    {{ getValueOrPlaceholder(props.row, 'last_name') }}
                  </span>
                  <b-icon
                    v-if="props.index === 0"
                    pack="mdi"
                    icon="alpha-c-circle-outline"
                    size="is-small"
                  />
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_team')">
                  {{ getValueOrPlaceholder(props.row, 'team.abbr') }}
                </b-table-column>

                <b-table-column
                  v-if="
                    $moment(selectedRace.submit_deadline_week_2) >
                      $moment(new Date())
                  "
                  v-slot="props"
                  width="68"
                >
                  <div class="block">
                    <b-icon
                      v-if="props.row.id && props.index !== 0"
                      pack="mdi"
                      icon="alpha-c-circle-outline"
                      size="is-small"
                      @click.native="
                        showMakeRiderCaptainModal(
                          'predictions_week_2',
                          props.index,
                          2,
                          props.row.last_name
                        )
                      "
                    />
                    <b-icon
                      v-if="props.row.id"
                      pack="mdi"
                      icon="close"
                      size="is-small"
                      @click.native="
                        showRemoveRiderFromWeekModal(
                          'predictions_week_2',
                          props.index,
                          2,
                          props.row.last_name
                        )
                      "
                    />
                  </div>
                </b-table-column>
              </b-table>
            </div>
            <div class="column is-one-third-desktop">
              <h2 class="title is-5 mb-2">
                {{ $t('page_myprediction_riders_week_3') }}
              </h2>
              <p class="mb-4">
                <small
                  >{{ $t('page_myprediction_deadline') }}:
                  {{
                    $moment(selectedRace.submit_deadline_week_3).format(
                      'ddd D MMM @ HH:mm'
                    )
                  }}</small
                >
              </p>
              <b-table
                class="table-shadow"
                :class="{
                  disabled:
                    $moment(selectedRace.submit_deadline_week_3) <
                    $moment(new Date())
                }"
                :data="team_week_3"
                :mobile-cards="hasMobileCards"
                :loading="isLoading"
                draggable
                @dragstart="dragstart($event, 'predictions_week_3', 3)"
                @drop="drop($event, 'predictions_week_3', 3)"
                @dragover="dragover"
                @dragleave="dragleave"
              >
                <b-table-column v-slot="props" label="" width="40" numeric>
                  {{ props.row.start_number }}
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_rider')">
                  <span :class="{ 'is-withdrawn': props.row.is_withdrawn }">
                    {{ getValueOrPlaceholder(props.row, 'last_name') }}
                  </span>
                  <b-icon
                    v-if="props.index === 0"
                    pack="mdi"
                    icon="alpha-c-circle-outline"
                    size="is-small"
                  />
                </b-table-column>

                <b-table-column v-slot="props" :label="$t('table_th_team')">
                  {{ getValueOrPlaceholder(props.row, 'team.abbr') }}
                </b-table-column>

                <b-table-column
                  v-if="
                    $moment(selectedRace.submit_deadline_week_3) >
                      $moment(new Date())
                  "
                  v-slot="props"
                  width="68"
                >
                  <div class="block">
                    <b-icon
                      v-if="props.row.id && props.index !== 0"
                      pack="mdi"
                      icon="alpha-c-circle-outline"
                      size="is-small"
                      @click.native="
                        showMakeRiderCaptainModal(
                          'predictions_week_3',
                          props.index,
                          3,
                          props.row.last_name
                        )
                      "
                    />
                    <b-icon
                      v-if="props.row.id"
                      pack="mdi"
                      icon="close"
                      size="is-small"
                      @click.native="
                        showRemoveRiderFromWeekModal(
                          'predictions_week_3',
                          props.index,
                          3,
                          props.row.last_name
                        )
                      "
                    />
                  </div>
                </b-table-column>
              </b-table>
            </div>
          </div>
          <h2 class="title is-5">
            {{ $t('page_myprediction_select_riders') }}
          </h2>
          <div class="columns">
            <div class="column">
              <div>
                <b-table
                  ref="selectRiders"
                  class="table-shadow"
                  :data="riders_view"
                  :default-sort-direction="defaultSortDirection"
                  :sort-icon="sortIcon"
                  :sort-icon-size="sortIconSize"
                  :mobile-cards="hasMobileCards"
                  default-sort="start_number"
                  draggable
                  @dragstart="dragstart($event, 'riders')"
                  @dragover="dragover"
                  @dragleave="dragleave"
                >
                  <template v-for="column in riders_columns">
                    <b-table-column :key="column.id" v-bind="column">
                      <template
                        v-if="column.searchable && !column.numeric"
                        slot="searchable"
                        slot-scope="props"
                      >
                        <b-input
                          v-model="props.filters[props.column.field]"
                          :placeholder="$t('table_th_search')"
                          size="is-small"
                        />
                      </template>

                      <template v-slot="props">
                        <!-- if field includes "image" word we will use img tag  -->
                        <img
                          v-if="column.field.includes('image')"
                          width="16"
                          style="max-width:16px"
                          :src="getObjectValue(props.row, column.field)"
                        />
                        <!-- if field is icon we will show b-icon tag -->
                        <b-icon
                          v-else-if="column.field === 'icon'"
                          pack="mdi"
                          :icon="column.icon"
                          :class="{
                            'is-hidden':
                              props.row.is_withdrawn ||
                              $moment(selectedRace.submit_deadline_week_3) <
                                $moment(new Date())
                          }"
                          size="is-small"
                          @click.native="
                            showAddRiderToWeekModal(
                              props.row.full_name,
                              props.row.id
                            )
                          "
                        />
                        <template v-else-if="column.field === 'first_name'">
                          <span
                            :class="{ 'is-withdrawn': props.row.is_withdrawn }"
                          >
                            {{ getValueOrPlaceholder(props.row, column.field) }}
                          </span>
                        </template>
                        <template v-else-if="column.field === 'last_name'">
                          <span
                            :class="{ 'is-withdrawn': props.row.is_withdrawn }"
                          >
                            {{ getValueOrPlaceholder(props.row, column.field) }}
                          </span>
                        </template>
                        <template v-else-if="column.field === 'team.name'">
                          {{ getValueOrPlaceholder(props.row, column.field) }}
                        </template>
                        <template v-else-if="column.field === 'ridertype.name'">
                          {{ getValueOrPlaceholder(props.row, column.field) }}
                        </template>
                        <!-- else we will use standard text output -->
                        <template v-else>
                          {{ getObjectValue(props.row, column.field) }}
                        </template>
                      </template>
                    </b-table-column>
                  </template>
                  <template v-if="ridersEmpty" slot="empty">
                    <section class="section">
                      <div class="content has-text-grey has-centered-text">
                        <p>
                          {{
                            $t('page_myprediction_select_riders_empty_message')
                          }}
                        </p>
                      </div>
                    </section>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <b-modal
      :active.sync="isMakeRiderCaptainModalActive"
      :has-modal-card="true"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_myprediction_make_rider_captain_title') }}
          </p>
        </header>
        <section class="modal-card-body">
          {{
            $t('page_myprediction_make_rider_captain', {
              rider: makeRiderCaptainModalRiderName,
              week: makeRiderCaptainModalRiderWeekNumber
            })
          }}
        </section>
        <footer class="modal-card-foot buttons">
          <button
            class="button is-primary"
            type="button"
            @click="
              makeRiderCaptainInPredictions(
                makeRiderCaptainModalRiderWeek,
                makeRiderCaptainModalRiderIndex,
                makeRiderCaptainModalRiderWeekNumber,
                makeRiderCaptainModalRiderName
              )
            "
          >
            {{ $t('page_myprediction_yes_button') }}
          </button>
          <button
            class="button"
            type="button"
            @click="isMakeRiderCaptainModalActive = false"
          >
            {{ $t('page_myprediction_no_button') }}
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isAddRiderToWeekActive" :has-modal-card="true">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_myprediction_add_rider_to_title') }}
          </p>
        </header>
        <section class="modal-card-body">
          {{
            $t('page_myprediction_add_rider_to', {
              rider: addRiderToWeekModalRiderName
            })
          }}
          <br />
          <br />
          <button
            v-if="
              $moment(selectedRace.submit_deadline_week_1) > $moment(new Date())
            "
            v-scroll-to="'body'"
            class="button is-primary"
            type="button"
            @click="addRiderToPredictions('predictions_week_1', 1)"
          >
            {{ $t('page_myprediction_week') }} 1
          </button>
          <button
            v-if="
              $moment(selectedRace.submit_deadline_week_2) > $moment(new Date())
            "
            v-scroll-to="'body'"
            class="button is-primary"
            type="button"
            @click="addRiderToPredictions('predictions_week_2', 2)"
          >
            {{ $t('page_myprediction_week') }} 2
          </button>
          <button
            v-if="
              $moment(selectedRace.submit_deadline_week_3) > $moment(new Date())
            "
            v-scroll-to="'body'"
            class="button is-primary"
            type="button"
            @click="addRiderToPredictions('predictions_week_3', 3)"
          >
            {{ $t('page_myprediction_week') }} 3
          </button>
        </section>
        <footer class="modal-card-foot buttons">
          <button
            class="button"
            type="button"
            @click="isAddRiderToWeekActive = false"
          >
            {{ $t('page_myprediction_cancel_button') }}
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal
      :active.sync="isRemoveRiderToWeekModalActive"
      :has-modal-card="true"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_myprediction_remove_rider_from_title') }}
          </p>
        </header>
        <section class="modal-card-body">
          <p>
            {{
              $t('page_myprediction_remove_rider_from', {
                rider: removeRiderToWeekModalRiderName,
                week: removeRiderToWeekModalRiderWeekNumber
              })
            }}
          </p>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            type="button"
            @click="
              removeRiderFromPredictions(
                removeRiderToWeekModalRiderWeek,
                removeRiderToWeekModalRiderIndex,
                removeRiderToWeekModalRiderWeekNumber,
                removeRiderToWeekModalRiderName
              )
            "
          >
            {{ $t('page_myprediction_yes_button') }}
          </button>
          <button
            class="button"
            type="button"
            @click="isRemoveRiderToWeekModalActive = false"
          >
            {{ $t('page_myprediction_no_button') }}
          </button>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import { withCatch, getMetaTags } from '@/utils'
import PageTitle from '@/components/PageTitle'

function sortPredictions(predictions) {
  const predictionsEmpty = predictions
    .filter(item => item.rider_id === null)
    .sort((a, b) => a.order - b.order)
  const predictionsFilled = predictions
    .filter(item => item.rider_id !== null)
    .sort((a, b) => a.order - b.order)
  return [...predictionsFilled, ...predictionsEmpty]
}

function fillEmptyPredictions(raceParam, predictions, week) {
  const filledPredictions = [...predictions]
  for (let index = 0; index < 8 - predictions.length; index++) {
    filledPredictions.push({
      id: null,
      rider_id: null,
      order: index + predictions.length + 1,
      week
    })
  }

  const racePredictions = {}
  racePredictions[raceParam] = filledPredictions

  return racePredictions
}

export default {
  middleware: 'authRequired',
  components: {
    PageTitle
  },
  async asyncData({ app, params, redirect, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      Promise.all([
        app.$raceApi.getMyUserteam(params.race),
        app.$raceApi.getRiders(params.race),
        app.$raceApi.getPredictions(params.race)
      ])
    )
    if (err) {
      $sentry.captureException(err)
      return
    }

    const [userteamRes, ridersRes, predictionsRes] = res

    const myUserteamData = userteamRes.data

    const predictionsWeek1 = sortPredictions(
      predictionsRes.data.filter(item => item.week === 1)
    )
    const predictionsWeek2 = sortPredictions(
      predictionsRes.data.filter(item => item.week === 2)
    )
    const predictionsWeek3 = sortPredictions(
      predictionsRes.data.filter(item => item.week === 3)
    )

    const ridersData = ridersRes.data

    let isRidersDataEmpty = false
    if (ridersData.length === 0) {
      isRidersDataEmpty = true
    }

    return {
      myUserteam: myUserteamData,
      riders: ridersData,
      ridersEmpty: isRidersDataEmpty,
      predictions_week_1: fillEmptyPredictions(
        params.race,
        predictionsWeek1,
        1
      ),
      predictions_week_2: fillEmptyPredictions(
        params.race,
        predictionsWeek2,
        2
      ),
      predictions_week_3: fillEmptyPredictions(params.race, predictionsWeek3, 3)
    }
  },
  data() {
    return {
      isLoading: false,
      isAddRiderToWeekActive: false,
      addRiderToWeekModalRiderName: '',
      addRiderToWeekModalRiderId: null,
      isMakeRiderCaptainModalActive: false,
      makeRiderCaptainModalRiderName: '',
      makeRiderCaptainModalRiderWeekNumber: null,
      isRemoveRiderToWeekModalActive: false,
      removeRiderToWeekModalRiderName: '',
      removeRiderToWeekModalRiderWeekNumber: null,
      myUserteam: null,
      predictions_week_1: fillEmptyPredictions(this.$route.params.race, [], 1),
      predictions_week_2: fillEmptyPredictions(this.$route.params.race, [], 2),
      predictions_week_3: fillEmptyPredictions(this.$route.params.race, [], 3),
      riders: [],
      ridersEmpty: false,
      riders_columns: [
        {
          field: 'start_number',
          label: '#',
          width: '40',
          numeric: true,
          sortable: true
        },
        {
          field: 'country.image_url_flags_4x3',
          label: ' ',
          width: '40'
        },
        {
          field: 'first_name',
          label: this.$t('table_th_first_name'),
          searchable: true,
          sortable: true
        },
        {
          field: 'last_name',
          label: this.$t('table_th_last_name'),
          searchable: true,
          sortable: true
        },
        {
          field: 'team.name',
          label: this.$t('table_th_team'),
          searchable: true,
          sortable: true
        },
        {
          field: 'icon',
          label: ' ',
          icon: 'plus',
          width: '40'
        }
      ],
      draggingRow: null,
      draggingRowIndex: null,
      draggingFromTable: null,
      draggingFromWeekNumber: null,
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      hasMobileCards: false
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    team_week_1() {
      return this.setTeamLength(
        this.getWeekTeam(this.predictions_week_1[this.$route.params.race])
      )
    },
    team_week_2() {
      return this.setTeamLength(
        this.getWeekTeam(this.predictions_week_2[this.$route.params.race])
      )
    },
    team_week_3() {
      return this.setTeamLength(
        this.getWeekTeam(this.predictions_week_3[this.$route.params.race])
      )
    },
    allPredictions() {
      this.setPredictionsOrder(
        this.predictions_week_1[this.$route.params.race],
        1
      )
      this.setPredictionsOrder(
        this.predictions_week_2[this.$route.params.race],
        2
      )
      this.setPredictionsOrder(
        this.predictions_week_3[this.$route.params.race],
        3
      )
      return [
        ...this.predictions_week_1[this.$route.params.race],
        ...this.predictions_week_2[this.$route.params.race],
        ...this.predictions_week_3[this.$route.params.race]
      ]
    },
    riders_view() {
      const ridersWithoutPredictions = this.riders.filter(item => {
        let result = true
        this.allPredictions.forEach(prediction => {
          if (prediction.rider_id === item.id) {
            result = false
          }
        })
        return result
      })
      return ridersWithoutPredictions
    }
  },
  methods: {
    getPageUrl() {
      const domain = this.settings.domain.name
      return `https://${domain}${this.$route.path}`
    },
    getSelectedRaceFullName() {
      return this.selectedRace.name + ' ' + this.selectedRace.year
    },
    // recursive method for getting value from object
    getObjectValue(object, field) {
      let resultValue = ''
      // if object exists
      if (object) {
        // check if field has inner field
        if (field.includes('.')) {
          // if so, get outer object first, get inner field, and start recursive method
          const dotPosition = field.indexOf('.')
          resultValue = this.getObjectValue(
            object[field.slice(0, dotPosition)],
            field.slice(dotPosition + 1)
          )
        } else {
          // if it's simple field get the value
          resultValue = object[field]
        }
      }
      return resultValue
    },
    getValueOrPlaceholder(object, field) {
      if (field === 'first_name') {
        return object.first_name || '-'
      }
      if (field === 'last_name') {
        return object.last_name || '-'
      }
      if (field === 'full_name') {
        if (typeof object.full_name !== 'undefined') {
          return object.full_name || '-'
        }
      }
      if (field === 'team.name') {
        if (object.team) {
          return object.team.name || '-'
        }
      }
      if (field === 'team.abbr') {
        if (object.team) {
          return object.team.abbr || '-'
        }
      }
      if (field === 'ridertype.name') {
        if (object.ridertype) {
          return object.ridertype.name || '-'
        }
      }

      return '-'
    },
    getWeekTeam(predictions) {
      const weekTeam = predictions
        .filter(item => item.rider_id !== null)
        .map(prediction => {
          return this.riders.find(rider => {
            if (prediction.rider_id === rider.id) {
              return true
            }
          })
        })
      return weekTeam
    },
    setTeamLength(teamArr) {
      let arrForView = teamArr.slice()
      if (arrForView.length < 8) {
        for (let index = arrForView.length; index < 8; index++) {
          arrForView.push({})
        }
      } else {
        arrForView = arrForView.slice(0, 8)
      }
      return arrForView
    },
    setPredictionsOrder(predictions, week) {
      predictions.forEach((item, index) => {
        item.order = index + 1
        item.week = week
      })
    },
    showMakeRiderCaptainModal(week, index, weekNumber, name) {
      this.isMakeRiderCaptainModalActive = true
      this.makeRiderCaptainModalRiderWeek = week
      this.makeRiderCaptainModalRiderIndex = index
      this.makeRiderCaptainModalRiderName = name
      this.makeRiderCaptainModalRiderWeekNumber = weekNumber
    },
    showRemoveRiderFromWeekModal(week, index, weekNumber, name) {
      this.isRemoveRiderToWeekModalActive = true
      this.removeRiderToWeekModalRiderWeek = week
      this.removeRiderToWeekModalRiderIndex = index
      this.removeRiderToWeekModalRiderName = name
      this.removeRiderToWeekModalRiderWeekNumber = weekNumber
    },
    makeRiderCaptainInPredictions(week, index, weekNumber, name) {
      const currentPosition = this[week][this.$route.params.race].splice(
        index,
        1
      )[0]
      this[week][this.$route.params.race].splice(0, 0, currentPosition)

      this.$buefy.toast.open(
        this.$t('page_myprediction_toast_message_rider_named_captain', {
          rider: name,
          week: weekNumber
        })
      )
      this.isMakeRiderCaptainModalActive = false
      this.saveData()
    },
    removeRiderFromPredictions(week, index, weekNumber, name) {
      this[week][this.$route.params.race][index].rider_id = null
      this.$buefy.toast.open(
        this.$t('page_myprediction_toast_message_rider_removed', {
          rider: name,
          week: weekNumber
        })
      )
      this.isRemoveRiderToWeekModalActive = false
      this.saveData()
    },
    showAddRiderToWeekModal(name, id) {
      this.isAddRiderToWeekActive = true
      this.addRiderToWeekModalRiderName = name
      this.addRiderToWeekModalRiderId = id
    },
    addRiderToPredictions(week, weekNumber) {
      const emptyRowIndex = this[week][this.$route.params.race].filter(
        item => item.rider_id !== null
      ).length
      if (emptyRowIndex < 8) {
        this[week][this.$route.params.race][
          emptyRowIndex
        ].rider_id = this.addRiderToWeekModalRiderId
        this.$buefy.toast.open(
          this.$t('page_myprediction_toast_message_rider_added', {
            rider: this.addRiderToWeekModalRiderName,
            week: weekNumber
          })
        )
        this.isAddRiderToWeekActive = false
        this.saveData()
      } else {
        this.$buefy.toast.open(
          this.$t('page_myprediction_toast_message_week_complete', {
            week: weekNumber
          })
        )
      }
    },
    saveData() {
      this.isLoading = true
      this.$axios
        .$post(
          `/api/v1/race/${this.selectedRace.slug}/predictions`,
          this.allPredictions
        )
        .then(predictions => {
          const predictionsWeek1 = sortPredictions(
            predictions.data.filter(item => item.week === 1)
          )
          const predictionsWeek2 = sortPredictions(
            predictions.data.filter(item => item.week === 2)
          )
          const predictionsWeek3 = sortPredictions(
            predictions.data.filter(item => item.week === 3)
          )
          this.predictions_week_1[this.$route.params.race] = predictionsWeek1
          this.predictions_week_2[this.$route.params.race] = predictionsWeek2
          this.predictions_week_3[this.$route.params.race] = predictionsWeek3
          this.isLoading = false
        })
        .catch(err => {
          this.$sentry.captureException(err)
        })
    },
    resetSelectRidersSearch() {
      this.$refs.selectRiders.filters = {}
    },
    dragstart({ row, event, index }, table, weekNumber) {
      this.draggingRow = row
      this.draggingRowIndex = index
      this.draggingFromTable = table
      this.draggingFromWeekNumber = weekNumber
      event.dataTransfer.effectAllowed = 'copy'
    },
    dragover(payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('tr').classList.add('is-selected')
      payload.event.preventDefault()
    },
    dragleave(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      payload.event.preventDefault()
    },
    drop({ row, event, index }, finalTable, weekNumber) {
      // if it's not empty object
      if (Object.keys(this.draggingRow).length > 0) {
        const emptyRowIndex = this[finalTable][this.$route.params.race].filter(
          item => item.rider_id !== null
        ).length
        if (emptyRowIndex < 8 || this.draggingFromTable === finalTable) {
          // select position for adding
          if (index > emptyRowIndex && emptyRowIndex < 8) {
            index = emptyRowIndex
          }
          // add item to predictions from select
          if (this.draggingFromTable === 'riders') {
            // move another predictions if they exist
            if (this[finalTable][this.$route.params.race][index].rider_id) {
              for (let i = emptyRowIndex; i > index; i--) {
                this[finalTable][this.$route.params.race][i].rider_id = this[
                  finalTable
                ][i - 1].rider_id
              }
            }
            // update prediction
            this[finalTable][this.$route.params.race][
              index
            ].rider_id = this.draggingRow.id
            this.$buefy.toast.open(
              this.$t('page_myprediction_toast_message_rider_added', {
                rider: this.draggingRow.full_name,
                week: weekNumber
              })
            )
          } else if (this.draggingFromTable === finalTable) {
            // change order in one week
            const objForMoving = this[finalTable][
              this.$route.params.race
            ].splice(this.draggingRowIndex, 1)[0]
            if (index === emptyRowIndex) {
              index--
            }
            this[finalTable][this.$route.params.race].splice(
              index,
              0,
              objForMoving
            )
            this.$buefy.toast.open(
              this.$t('page_myprediction_toast_message_rider_reordered', {
                rider: this.draggingRow.full_name,
                fromPosition: this.draggingRowIndex + 1,
                toPosition: index + 1
              })
            )
          } else {
            // move prediction from one week no another
            const idForMoving = this[this.draggingFromTable][
              this.$route.params.race
            ][this.draggingRowIndex].rider_id
            this[this.draggingFromTable][this.$route.params.race][
              this.draggingRowIndex
            ].rider_id = null
            if (this[finalTable][this.$route.params.race][index].rider_id) {
              for (let i = emptyRowIndex; i > index; i--) {
                this[finalTable][this.$route.params.race][i].rider_id = this[
                  finalTable
                ][this.$route.params.race][i - 1].rider_id
              }
            }
            this[finalTable][this.$route.params.race][
              index
            ].rider_id = idForMoving
            this.$buefy.toast.open(
              this.$t('page_myprediction_toast_message_rider_moved', {
                rider: this.draggingRow.full_name,
                fromWeek: this.draggingFromWeekNumber,
                toWeek: weekNumber
              })
            )
          }
          this.saveData()
          this.resetSelectRidersSearch()
        } else {
          this.$buefy.toast.open(
            this.$t('page_myprediction_toast_message_week_complete', {
              week: weekNumber
            })
          )
        }
      }
      event.target.closest('tr').classList.remove('is-selected')
    }
  },
  head() {
    const title =
      this.$t('page_myprediction_title') +
      ' - ' +
      this.getSelectedRaceFullName()
    const description = this.$t('page_my_predicition_seo_description', {
      race: this.getSelectedRaceFullName()
    })
    const pageUrl = this.getPageUrl()
    const settings = this.settings

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
.table-wrapper table tbody tr[draggable='true'] {
  cursor: grab;
}
.table-wrapper table tbody tr {
  cursor: pointer;
}
.modal-card-title {
  flex-shrink: 1;
}
</style>
