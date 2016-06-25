<template>
<div id="focused-stream-window"></div>
</template>

<script>
export default {
  name: 'FocusedStreamWindow',

  props: {
    stream: Object,
  },
};
</script>

<style lang="stylus">
#focused-stream-window
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
