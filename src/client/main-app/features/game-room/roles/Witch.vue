<template>
<div class="tools">
  <div class="kill"
</div>
</template>

<script>

export default {
  name: 'Witch',

  components: {
  },

  ready() {
    const socket = io();
    console.log(socket);
    console.log('ready');
  },
};
</script>

<style lang="stylus">
</style>
