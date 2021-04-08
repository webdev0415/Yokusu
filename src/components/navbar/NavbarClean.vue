<template>
  <b-navbar type="is-yosoku" class="is-transparent is-spaced hide-burger">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="localePath('index')">
        <img
          :src="settings.domain.logo_url"
          :alt="settings.domain.title"
          class="mr-2"
        />
        <strong>{{ settings.domain.title }}</strong>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  computed: {
    ...settingsStateMapGetter()
  }
}
</script>
