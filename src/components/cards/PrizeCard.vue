<template>
  <div
    class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd"
  >
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="prize.image_url_prize" :alt="prize.title" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <div class="media-content">
              <p class="title is-4">{{ prize.title }}</p>
              <p class="subtitle is-6">{{ prize.subtitle }}</p>
            </div>
          </div>
          <div class="content">
            {{ prize.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prize: {
      type: Object,
      required: true
    }
  }
}
</script>
