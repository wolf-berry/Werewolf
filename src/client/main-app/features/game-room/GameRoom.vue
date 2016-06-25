<template>
<div>
  <!--
  <focused-user-background></focused-user-background>
  <unfocused-user-windows class="game-room__unfocused-user-windows"></unfocused-user-windows>
  -->
</div>
</template>

<script>
import FocusedUserBackground from './FocusedUserBackground';
import UnfocusedUserWindows from './UnfocusedUserWindows';
import Werewolf from './roles/Werewolf.vue';
import Seer from './roles/Seer.vue';
import Witch from './roles/Witch.vue';
import Civilian from './roles/Civilian.vue';
import io from 'socket.io-client';

import {
  setFocusedUserId,
} from '../../vuex/actions';

export default {
  name: 'GameRoom',

  components: {
    FocusedUserBackground,
    UnfocusedUserWindows,
  },

  vuex: {
    actions: {
      setFocusedUserId,
    },
    getters: {
      currentUserId: (state) => state.currentUserId,
    },
  },

  ready() {
    //const socket = io(`${window.location.protocol}//${window.location.hostname}:` + __PORT__);
    //console.log(`${window.location.protocol}//${window.location.hostname}:` + __PORT__);
    const socket = io.connect('http://localhost:4567');
    this.setFocusedUserId(this.currentUserId);
  },
};
</script>

<style lang="stylus">
.game-rom
  &__unfocused-user-windows
    position fixed
    left 0
    right 0
    bottom 0
    height 150px
    border 1px solid red
</style>
