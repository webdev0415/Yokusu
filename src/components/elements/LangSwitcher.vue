<template>
  <b-dropdown :triggers="['click']" position="is-top-right" aria-role="list">
    <button slot="trigger" class="button is-text is-small">
      <span> {{ getCurrentLocale }} </span>
      <b-icon icon="menu-down"></b-icon>
    </button>
    <div v-for="locale in availableLocales" :key="locale.code">
      <b-dropdown-item has-link aria-role="listitem">
        <nuxt-link :to="switchLocalePath(locale.code)" class="pr-1-touch">
          {{ locale.name }}
        </nuxt-link>
      </b-dropdown-item>
    </div>
  </b-dropdown>
</template>

<script>
export default {
  computed: {
    getCurrentLocale() {
      const currentLocale = this.$i18n.locales.filter(
        i => i.code === this.$i18n.locale
      )

      return currentLocale[0].name
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
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
