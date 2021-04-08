<template>
  <div>
    <template v-if="activeRaces.length > 1">
      <b-dropdown
        :triggers="['click']"
        position="is-bottom-left"
        aria-role="list"
      >
        <button
          slot="trigger"
          class="button is-link is-outlined"
          :class="classes"
        >
          <span>{{ selectedRace.name }} {{ selectedRace.year }}</span>
          <b-icon icon="menu-down"></b-icon>
        </button>
        <div v-for="activeRace in activeRaces" :key="activeRace.race.slug">
          <template v-if="selectedRace.slug !== activeRace.race.slug">
            <b-dropdown-item has-link aria-role="listitem">
              <template v-if="settings.race.slug === activeRace.race.slug">
                <nuxt-link
                  :key="activeRace.race.slug"
                  :to="localePath('index')"
                  class="pr-1-touch"
                >
                  {{ activeRace.race.name }} {{ activeRace.race.year }}
                </nuxt-link>
              </template>
              <template v-else>
                <nuxt-link
                  :key="activeRace.race.slug"
                  :to="
                    localePath({
                      name: 'race',
                      params: {
                        race: activeRace.race.slug
                      }
                    })
                  "
                  class="pr-1-touch"
                >
                  {{ activeRace.race.name }} {{ activeRace.race.year }}
                </nuxt-link>
              </template>
            </b-dropdown-item>
          </template>
        </div>
      </b-dropdown>
    </template>
    <template v-else>
      <div class="py-2">
        <span class="has-text-weight-bold">
          {{ selectedRace.name }} {{ selectedRace.year }}
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  props: {
    classes: {
      type: String,
      default: '',
      required: false
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
