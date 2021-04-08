<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form novalidate @submit.prevent="passes(renameUserteam)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('page_myaccount_rename_userteam_title') }}
          </p>
          <button class="delete" aria-label="close" @click="$parent.close()" />
        </header>
        <section class="modal-card-body">
          <ValidationProvider
            v-slot="{ errors }"
            vid="name"
            rules="required|min:3|max:40"
            :name="$t('page_myaccount_rename_userteam_label')"
          >
            <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
              <b-input
                v-model.trim="form.name"
                type="text"
                :placeholder="$t('page_myaccount_rename_userteam_placeholder')"
              />
            </b-field>
          </ValidationProvider>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">
            {{ $t('page_myaccount_rename_userteam_submit_button') }}
          </button>
          <button class="button" type="button" @click="$parent.close()">
            {{ $t('page_myaccount_rename_userteam_cancel_button') }}
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
    userteam: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: this.userteam.name
      }
    }
  },
  computed: {
    ...settingsStateMapGetter()
  },
  methods: {
    async renameUserteam() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        const { data } = await this.$axios.$patch(
          `/api/v1/race/${this.selectedRace.slug}/userteams/${this.userteam.id}`,
          {
            name: this.form.name
          }
        )
        await this.$auth.fetchUser()
        loadingComponent.close()
        this.$parent.close()
        this.$router.push(
          this.localePath({
            name: 'race-userteam-slug',
            params: { race: this.selectedRace.slug, slug: data.slug }
          })
        )
        this.$buefy.toast.open(
          this.$t('page_myaccount_rename_userteam_toast_message')
        )
      } catch (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
      }
    }
  }
}
</script>
