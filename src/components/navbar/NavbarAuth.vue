<template>
  <b-navbar class="is-transparent is-spaced" :style="getNavbarStyle">
    <template slot="brand">
      <b-navbar-item
        tag="nuxt-link"
        :to="localePath('index')"
        :class="settings.domain.navbar_title_class"
      >
        <img
          v-if="settings.domain.logo_url"
          :src="settings.domain.logo_url"
          :alt="settings.domain.title"
          class="mr-2"
        />
        <strong>{{ settings.domain.title }}</strong>
      </b-navbar-item>
    </template>
    <template slot="burger" slot-scope="{ isOpened, toggleActive }">
      <a
        class="navbar-burger burger"
        :aria-expanded="isOpened"
        :class="[{ 'is-active': isOpened }, settings.domain.navbar_title_class]"
        @click="toggleActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link :to="localePath('login')" class="button is-light">
            {{ $t('navbar_item_login') }}
          </nuxt-link>
          <nuxt-link
            :to="localePath('register')"
            class="button"
            :class="settings.domain.navbar_button_class"
          >
            {{ $t('navbar_item_register') }}
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  computed: {
    ...settingsStateMapGetter(),
    getNavbarStyle() {
      return {
        'background-color': this.navbarColor
      }
    }
  }
}
</script>
