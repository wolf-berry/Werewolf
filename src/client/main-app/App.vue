<template>
  <div class="app full-height">
    <h1>{{ message }}</h1>
    <a v-link="{ name: 'game-hall' }">Goto GameHall</a>
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
      message: 'Express + Vue boilerplate',
    };
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
