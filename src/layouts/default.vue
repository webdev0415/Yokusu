<template>
  <div>
    <NavbarFull />
    <Menu />
    <div class="main-content">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { settingsStateMapGetter } from '@/services/settingsService'
import NavbarFull from '@/components/navbar/NavbarFull'
import Menu from '@/components/elements/Menu'
import Footer from '@/components/elements/Footer'

export default {
  components: {
    NavbarFull,
    Menu,
    Footer
  },
  computed: {
    ...settingsStateMapGetter()
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
</style>
