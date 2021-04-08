<template>
  <div>
    <NavbarClean />
    <div class="main-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavbarClean from '@/components/navbar/NavbarClean'

export default {
  components: {
    NavbarClean
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
</style>
