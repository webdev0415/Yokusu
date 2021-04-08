<template>
  <section class="section">
    <div class="container">
      <p>Env var:</p>
      {{ $config.projectId }}
      <p>Request data:</p>
      <p>{{ requestData }}</p>
      <p>process.env.CLIENT_HOST:</p>
      <p>{{ clientHost }}</p>
    </div>
  </section>
</template>

<script>
import { withCatch } from '@/utils'

export default {
  layout: 'clean',
  async asyncData({ $axios, error, $sentry }) {
    const { response: res, error: err } = await withCatch(() =>
      $axios.$get('/api/v1/request')
    )

    if (err) {
      $sentry.captureException(err)
      return
    }

    const { data } = res

    return {
      requestData: data
    }
  },
  data() {
    return {
      requestData: [],
      clientHost: process.env.CLIENT_HOST
    }
  }
}
</script>
