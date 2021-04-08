<template>
  <footer class="footer has-background-light">
    <div class="content has-text-centered">
      <div class="py-3">
        <LangSwitcher />
      </div>
      <p>
        <nuxt-link :to="localePath('halloffame')">
          {{ $t('footer_link_hall_of_fame') }}
        </nuxt-link>
        /
        <a href="https://www.yosokugames.com" target="_blank">Yosoku Games</a>
      </p>
      <p>
        <strong>{{ settings.domain.title }}</strong>
      </p>
      <a
        v-if="settings.domain.social_url_twitter"
        @click="openLink(settings.domain.social_url_twitter)"
      >
        <b-icon
          pack="mdi"
          icon="twitter"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a
        v-if="settings.domain.social_url_facebook"
        @click="openLink(settings.domain.social_url_facebook)"
      >
        <b-icon
          pack="mdi"
          icon="facebook"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a
        v-if="settings.domain.social_url_linkedin"
        @click="openLink(settings.domain.social_url_linkedin)"
      >
        <b-icon
          pack="mdi"
          icon="linkedin"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
      <a
        v-if="settings.domain.social_url_instagram"
        @click="openLink(settings.domain.social_url_instagram)"
      >
        <b-icon
          pack="mdi"
          icon="instagram"
          size="is-medium"
          class="has-text-dark"
        />
      </a>
    </div>
  </footer>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import LangSwitcher from '@/components/elements/LangSwitcher'

export default {
  components: {
    LangSwitcher
  },
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
