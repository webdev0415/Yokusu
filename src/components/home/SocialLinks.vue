<template>
  <div class="content has-text-centered">
    <p>
      <a @click="openLink(settings.domain.social_url_twitter)">
        <b-icon
          v-if="settings.domain.social_url_twitter"
          pack="mdi"
          icon="twitter"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a @click="openLink(settings.domain.social_url_facebook)">
        <b-icon
          v-if="settings.domain.social_url_facebook"
          pack="mdi"
          icon="facebook"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a @click="openLink(settings.domain.social_url_linkedin)">
        <b-icon
          v-if="settings.domain.social_url_linkedin"
          pack="mdi"
          icon="linkedin"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a @click="openLink(settings.domain.social_url_instagram)">
        <b-icon
          v-if="settings.domain.social_url_instagram"
          pack="mdi"
          icon="instagram"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
    </p>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  computed: {
    ...settingsStateMapGetter()
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>
