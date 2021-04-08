<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form novalidate @submit.prevent="passes(renamePool)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_pool_rename_pool_title') }}
          </p>
          <button class="delete" aria-label="close" @click="$parent.close()" />
        </header>
        <section class="modal-card-body">
          <ValidationProvider
            v-slot="{ errors }"
            vid="name"
            rules="required|min:3|max:40"
            :name="$t('page_pool_rename_pool_label')"
          >
            <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
              <b-input
                v-model.trim="form.name"
                type="text"
                :placeholder="$t('page_pool_rename_pool_placeholder')"
              />
            </b-field>
          </ValidationProvider>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">
            {{ $t('page_pool_rename_pool_submit_button') }}
          </button>
          <button class="button" type="button" @click="$parent.close()">
            {{ $t('page_pool_rename_pool_cancel_button') }}
          </button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { settingsStateMapGetter } from '@/services/settingsService'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    pool: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: this.pool.name
      }
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  methods: {
    async renamePool() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        const { data } = await this.$axios.$patch(
          `/api/v1/race/${this.selectedRace.slug}/pools/${this.pool.id}`,
          {
            name: this.form.name
          }
        )
        await this.$auth.fetchUser()
        loadingComponent.close()
        this.$parent.close()
        this.$router.push(
          this.localePath({
            name: 'race-pool-slug',
            params: { race: this.selectedRace.slug, slug: data.slug }
          })
        )
        // refresh
        this.$buefy.toast.open(this.$t('page_pool_rename_pool_toast_message'))
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  }
}
</script>
