<template>
<div>
  <div class="unfocused-stream-windows" v-for="stream in streams">
    stream {{stream.getId()}}
  </div>
</div>
</template>

<script>
export default {
  name: 'UnfocusedStreamWindows',

  props: {
    streams: Array,
  },
};
</script>

<style lang="stylus">
.unfocused-stream-windows
  width 100px
  height 100px
  border 1px solid grey
</style>
