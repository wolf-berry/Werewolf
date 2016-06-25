<template>
<div>
  <focused-user-background></focused-user-background>
  <unfocused-user-windows class="game-room__unfocused-user-windows"></unfocused-user-windows>
</div>
</template>

<script>
import FocusedUserBackground from './FocusedUserBackground';
import UnfocusedUserWindows from './UnfocusedUserWindows';

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
