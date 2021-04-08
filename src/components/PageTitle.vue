<template>
  <h1 class="title is-4" :class="classes">
    <slot />
  </h1>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
