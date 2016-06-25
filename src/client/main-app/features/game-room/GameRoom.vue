<template>
  <div>
    GameRoom
  </div>
</template>

<script>
import {
  kill,
} from '../../vuex/actions';

export default {
  name: 'GameRoom',

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
