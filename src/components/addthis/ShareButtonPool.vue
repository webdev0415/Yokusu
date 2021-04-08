<template>
  <div class="content has-text-centered">
    <p>{{ $t('addthis_invite_message') }}</p>
    <div class="addthis_inline_share_toolbox"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const addthisScript = document.createElement('script')
    addthisScript.setAttribute(
      'src',
      'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f2d31760017180e'
    )
    addthisScript.setAttribute('async', 'async')
    document.body.appendChild(addthisScript)
  }
}
</script>
