<template>
<div>
  <focused-stream-window :stream="focusedStream"></focused-stream-window>
  <unfocused-stream-windows class="game-room__unfocused-stream-windows" :streams="unfocusedStreams"></unfocused-stream-windows>
</div>
</template>

<script>
import FocusedStreamWindow from './FocusedStreamWindow';
import UnfocusedStreamWindows from './UnfocusedStreamWindows';

import {
  kill,
} from '../../vuex/actions';

export default {
  name: 'GameRoom',

  components: {
    FocusedStreamWindow,
    UnfocusedStreamWindows,
  },

  vuex: {
    actions: {
      kill,
    },
    getters: {
      currentUser: (state) => state.user,
    },
  },

  data () {
    return {
    };
  },
};
</script>

<style lang="stylus">
.game-rom
  &__unfocused-stream-windows
    position fixed
    left 0
    right 0
    bottom 0
    height 150px
    border 1px solid red
</style>
