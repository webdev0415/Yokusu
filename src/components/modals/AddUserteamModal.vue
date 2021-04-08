<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form novalidate @submit.prevent="passes(addNewUserteam)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('modal_new_userteam_title') }}
          </p>
          <button class="delete" aria-label="close" @click="$parent.close()" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p>
              {{
                $t('modal_new_userteam_message', {
                  race: selectedRace.name + ' ' + selectedRace.year
                })
              }}
            </p>
            <ValidationProvider
              v-slot="{ errors }"
              vid="name"
              rules="required|min:3|max:40"
              :name="$t('modal_new_userteam_label')"
            >
              <b-field :type="{ 'is-danger': errors[0] }" :message="errors">
                <b-input
                  v-model.trim="form.name"
                  type="text"
                  :placeholder="$t('modal_new_userteam_placeholder')"
                />
              </b-field>
            </ValidationProvider>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">
            {{ $t('modal_new_userteam_submit_button') }}
          </button>
          <button class="button" type="button" @click="$parent.close()">
            {{ $t('modal_new_userteam_cancel_button') }}
          </button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { settingsStateMapGetter } from '@/services/settingsService'
import { withCatch } from '@/utils'

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
    ...settingsStateMapGetter()
  },
  methods: {
    async addNewUserteam() {
      const loadingComponent = this.$buefy.loading.open()

      const { error: err } = await withCatch(() =>
        this.$raceApi.postNewUserteam(this.selectedRace.slug, {
          name: this.form.name,
          race_id: this.selectedRace.id
        })
      )

      if (err) {
        loadingComponent.close()
        this.$refs.observer.setErrors(err.response.data.errors)
        this.$buefy.toast.open(
          this.$t('modal_new_userteam_toast_message_failure')
        )
        return
      }

      await this.$auth.fetchUser()
      loadingComponent.close()
      this.$parent.close()
      window.location.reload(true)
      this.$buefy.toast.open(
        this.$t('modal_new_userteam_toast_message_success')
      )
    }
  }
}
</script>
