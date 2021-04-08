<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <template v-if="error.statusCode === 404">
          <h1 class="title">
            {{ $t('error_page_404_title') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('error_page_404_subtitle') }}
          </h2>
        </template>
        <template v-else-if="error.statusCode === 401">
          <h1 class="title">
            {{ $t('error_page_401_title') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('error_page_401_subtitle') }}
          </h2>
        </template>
        <template v-else>
          <h1 class="title">
            {{ $t('error_page_title') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('error_page_subtitle') }}
          </h2>
        </template>
        <p>
          <nuxt-link :to="localePath('index')" class="button is-outline">
            {{ $t('error_page_back_home_button') }} &raquo;
          </nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'clean',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
