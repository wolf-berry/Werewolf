<template>
<div>
  <div class="unfocused-user-windows" v-for="user in users" @click="setFocusedUserId(user.id)">
    user {{user.id}}
  </div>
</div>
</template>

<script>
import {
  setFocusedUserId,
} from '../../vuex/actions';

export default {
  name: 'UnfocusedStreamWindows',

  vuex: {
    actions: {
      setFocusedUserId,
    },
    getters: {
      users: (state) => state.users,
      focusedUserId: (state) => state.focusedUserId,
    },
  },
};
</script>

<style lang="stylus">
.unfocused-user-windows
  width 100px
  height 100px
  border 1px solid grey
</style>
