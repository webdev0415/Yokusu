<template>
  <div class="is-pulled-left mr-1">
    <b-dropdown :triggers="['click']" aria-role="list">
      <button slot="trigger" class="button is-small">
        <span>
          {{ selectedButtonTitle }}
          {{ selectedStageNumber }}
        </span>
        <b-icon icon="menu-down"></b-icon>
      </button>
      <div
        v-for="stage in selectedRaceStages.slice().reverse()"
        :key="stage.id"
      >
        <template v-if="stage.is_finished && stage.is_calculated">
          <b-dropdown-item has-link aria-role="listitem">
            <nuxt-link
              :key="stage.id"
              :to="
                localePath({
                  name: selectedPageName,
                  params: {
                    race: selectedRace.slug,
                    number: stage.number
                  }
                })
              "
              class="pr-1-touch"
            >
              {{ selectedPageTitle }}
              {{ selectedButtonSubtitle }}
              {{ stage.number }}
            </nuxt-link>
          </b-dropdown-item>
        </template>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  props: {
    selectedButtonTitle: {
      type: String,
      required: true
    },
    selectedButtonSubtitle: {
      type: String,
      required: true
    },
    selectedPageTitle: {
      type: String,
      required: true
    },
    selectedStageNumber: {
      type: String,
      required: true
    },
    selectedPageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mobileModal: false
    }
  },
  computed: {
    ...settingsStateMapGetter()
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  .pr-1-touch {
    padding-right: 1rem !important;
  }
}
</style>
