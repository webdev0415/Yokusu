<template>
  <b-navbar class="is-transparent is-spaced" :style="getNavbarStyle">
    <template slot="brand">
      <b-navbar-item
        tag="nuxt-link"
        :to="localePath('index')"
        :class="settings.domain.navbar_title_class"
      >
        <img
          v-if="settings.domain.logo_url"
          :src="settings.domain.logo_url"
          :alt="settings.domain.title"
          class="mr-2"
        />
        <strong>{{ settings.domain.title }}</strong>
      </b-navbar-item>
    </template>
    <template
      v-if="isAuthenticated"
      slot="burger"
      slot-scope="{ isOpened, toggleActive }"
    >
      <a
        class="navbar-burger burger"
        :aria-expanded="isOpened"
        :class="[{ 'is-active': isOpened }, settings.domain.navbar_title_class]"
        @click="toggleActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </template>
    <template v-if="!isAuthenticated" slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link :to="localePath('login')" class="button is-light">
            {{ $t('navbar_item_login') }}
          </nuxt-link>
          <nuxt-link
            :to="localePath('register')"
            class="button"
            :class="settings.domain.navbar_button_class"
          >
            {{ $t('navbar_item_register') }}
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
    <template v-if="isAuthenticated" slot="end">
      <template v-if="getUserteam">
        <b-navbar-item
          tag="router-link"
          :to="
            localePath({
              name: 'race-userteam-slug',
              params: {
                race: selectedRace.slug,
                slug: getUserteam.slug
              }
            })
          "
          class="is-hidden-touch"
          :class="settings.domain.navbar_title_class"
        >
          {{ getUserteam.name }}
        </b-navbar-item>
        <b-navbar-item
          v-if="!selectedRace.is_finished"
          tag="router-link"
          :to="
            localePath({
              name: 'race-myprediction',
              params: {
                race: selectedRace.slug
              }
            })
          "
          class="is-hidden-touch"
          :class="settings.domain.navbar_title_class"
        >
          {{ $t('navbar_item_myprediction') }}
        </b-navbar-item>
      </template>
      <template v-if="!getUserteam && !selectedRace.is_finished">
        <b-navbar-item tag="div" class="is-hidden-touch">
          <div class="buttons">
            <a class="button is-primary" @click="openAddUserteamModal()">
              {{ $t('navbar_item_add_userteam') }}
            </a>
          </div>
        </b-navbar-item>
      </template>
      <b-navbar-dropdown hoverable right>
        <template slot="label">
          <b-icon
            pack="mdi"
            icon="account"
            class="is-hidden-touch"
            :class="settings.domain.navbar_title_class"
          />
          <b-icon pack="mdi" icon="account" class="is-hidden-desktop" />
        </template>
        <b-navbar-item tag="router-link" :to="localePath('myaccount')">
          {{ $t('navbar_item_myaccount') }}
        </b-navbar-item>
        <hr class="navbar-divider" />
        <template v-if="loggedInUser.role.includes('admin')">
          <b-navbar-item tag="router-link" :to="localePath('admin')">
            {{ $t('navbar_item_admin') }}
          </b-navbar-item>
          <hr class="navbar-divider" />
        </template>
        <b-navbar-item @click.prevent="logout">
          {{ $t('navbar_item_logout') }}
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import { userAuthStateMapGetter } from '@/services/userService'
import AddUserteamModal from '@/components/modals/AddUserteamModal'

export default {
  computed: {
    ...settingsStateMapGetter(),
    ...userAuthStateMapGetter(),
    getNavbarStyle() {
      return {
        'background-color': this.navbarColor
      }
    },
    getUserteam() {
      const userteam = this.loggedInUser.userteams.filter(
        i => i.race_id === this.selectedRace.id
      )

      return userteam[0]
    }
  },
  methods: {
    openAddUserteamModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AddUserteamModal,
        hasModalCard: true,
        trapFocus: true
      })
    },
    async logout() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$auth.logout()
        loadingComponent.close()
        this.$buefy.toast.open(
          this.$t('page_logout_form_toast_message_success')
        )
        this.$router.push(this.localePath('index'))
      } catch (err) {
        loadingComponent.close()
        this.$buefy.toast.open(
          this.$t('page_logout_form_toast_message_failure')
        )
        this.$sentry.captureException(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-end {
  .nuxt-link-exact-active {
    display: inline-block;
    text-decoration: underline;
  }
}
</style>
