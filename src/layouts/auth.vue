<template>
  <div>
    <NavbarAuth />
    <div class="main-content">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarAuth from '@/components/navbar/NavbarAuth'
import Footer from '@/components/elements/Footer'

export default {
  components: {
    NavbarAuth,
    Footer
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
</style>
