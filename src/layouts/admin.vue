<template>
  <div>
    <NavbarAdmin />
    <div class="main-content">
      <section class="section">
        <Nuxt />
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarAdmin from '@/components/navbar/NavbarAdmin'
import Footer from '@/components/elements/Footer'

export default {
  components: {
    NavbarAdmin,
    Footer
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
</style>
