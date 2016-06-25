<template>
<div class="app__container">
  <router-view></router-view>
</div>
</template>

<script>
import store from './vuex/store';

export default {
  name: 'App',

  store,

  vuex: {
    getters: {
      agoraClient: (state) => state.agoraClient,
    },
  },

};
</script>

<style lang='stylus'>
@import '../common/style'

.app__container
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color black
</style>
