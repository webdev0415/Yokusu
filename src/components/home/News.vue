<template>
  <div class="card">
    <template v-if="api_status === 'PENDING'">
      <ApiStatusPending />
    </template>
    <template v-else-if="api_status === 'ERROR'">
      <ApiStatusError />
    </template>
    <template v-if="api_status === 'SUCCESS'">
      <div class="card-content px-2 py-0">
        <div class="content has-text-grey has-centered-text my-2 mx-2 py-2">
          <div v-if="news.length">
            <div v-for="(item, index) in news" :key="item.id">
              <template v-if="index < 5">
                <article class="media mb-0">
                  <figure class="media-left ml-0 my-0 mr-3 pt-1">
                    <p class="image is-96x96">
                      <img :src="item.image" />
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p class="has-text-dark">
                        {{ item.title }}<br />
                        <small>
                          <a @click="openLink(item.link)">
                            {{ $t('page_home_news_link_read_text') }}
                          </a>
                        </small>
                        ·
                        <small class="has-text-grey">
                          {{
                            $moment(item.pubDate)
                              .startOf('hour')
                              .fromNow()
                          }}
                        </small>
                      </p>
                    </div>
                  </div>
                </article>
                <hr v-if="index < 4" class="my-2" />
              </template>
            </div>
          </div>
          <div v-if="!news.length">
            <p>{{ $t('page_home_news_empty') }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'
import ApiStatusPending from '@/components/home/ApiStatusPending'
import ApiStatusError from '@/components/home/ApiStatusError'

export default {
  components: {
    ApiStatusPending,
    ApiStatusError
  },
  data() {
    return {
      news: [],
      api_status: 'PENDING'
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  created() {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData() {
      const { response: res, error: err } = await withCatch(() =>
        this.$raceApi.getNews(this.selectedRace.slug)
      )

      if (err) {
        this.$sentry.captureException(err)
        this.api_status = 'ERROR'
        return
      }

      const { data } = res

      this.news = data
      this.api_status = 'SUCCESS'
    },
    openLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>
