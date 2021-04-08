<template>
  <section class="hero is-light is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          {{ $t('page_promo_title') }}
        </p>
        <p class="subttitle">
          {{ $t('page_promo_subtitle') }}
        </p>
        <br />
        <p>
          <a
            href="https://www.wielerspelvoorbedrijven.nl/"
            class="button is-primary"
          >
            {{ $t('page_promo_button_text') }} &raquo;
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { getMetaTags } from '@/utils'

export default {
  layout: 'promo',
  head() {
    const title = this.$t('page_promo_title')
    const description = this.$t('page_promo_seo_description')
    const pageUrl = ''
    const settings = {
      domain: {
        title: 'Yosoku Games',
        og_image_url: '',
        social_url_twitter: ''
      }
    }

    return getMetaTags(title, description, pageUrl, settings)
  }
}
</script>
