<template>
  <div class="app full-height">
    <h1>{{ message }}</h1>
    <a v-link="{ name: 'game-hall' }">Goto GameHall</a>
    <a v-link="{ name: 'game-room' }">Goto GameRoom</a>
    <a v-link="{ name: 'test' }">Test Agora SDK</a>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store';

export default {
  name: 'App',

  store,

  data () {
    return {
      message: 'WereWolf',
    };
  },
};
</script>

<style lang='stylus'>
@import '../common/style'
</style>
