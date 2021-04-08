<template>
  <div
    class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
  >
    <div class="card" style="height: 340px;">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64 mx-0">
              <img :src="team.image_url_jersey" :alt="team.name" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5">
              {{ team.name }}
            </p>
            <p class="subtitle is-6">
              {{ team.country.name }}
            </p>
          </div>
        </div>
        <div class="content">
          <span
            v-for="rider in team.riders"
            :key="rider.id"
            :class="{ 'is-withdrawn': rider.is_withdrawn }"
          >
            {{ rider.first_name }} {{ rider.last_name }}<br />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>
