<template>
  <div>
    <NavbarPromo />
    <div class="main-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavbarPromo from '@/components/navbar/NavbarPromo'

export default {
  components: {
    NavbarPromo
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
</style>
