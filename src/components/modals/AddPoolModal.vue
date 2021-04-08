<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form novalidate @submit.prevent="passes(addPool)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_pools_add_pool_title') }}
          </p>
          <button class="delete" aria-label="close" @click="$parent.close()" />
        </header>
        <section class="modal-card-body">
          <ValidationProvider
            v-slot="{ errors }"
            vid="name"
            rules="required|min:3|max:40"
            :name="$t('page_pools_add_pool_label')"
          >
            <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
              <b-input
                v-model.trim="form.name"
                type="text"
                :placeholder="$t('page_pools_add_pool_placeholder')"
              />
            </b-field>
          </ValidationProvider>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">
            {{ $t('page_pools_add_pool_submit_button') }}
          </button>
          <button class="button" type="button" @click="$parent.close()">
            {{ $t('page_pools_add_pool_cancel_button') }}
          </button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    getUserteam() {
      const userteam = this.loggedInUser.userteams.filter(
        i => i.race_id === this.selectedRace.id
      )

      return userteam[0]
    }
  },
  methods: {
    async addPool() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        const { data } = await this.$axios.$post(
          `/api/v1/race/${this.selectedRace.slug}/pools`,
          {
            name: this.form.name,
            fantasy_userteam_id: this.getUserteam.id,
            race_id: this.selectedRace.id
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
        this.$buefy.toast.open(this.$t('page_pools_add_pool_toast_message'))
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  }
}
</script>
