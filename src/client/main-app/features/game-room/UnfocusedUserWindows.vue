<template>
<div>
  <div
    :id="user.id"
    class="unfocused-user-windows__item"
    :class="{ 'focused': user.id === focusedUserId, 'unfocused': user.id !== focusedUserId }"
    v-for="user in users"
    @click="setFocusedUserId(user.id)">
  </div>
  <div class="test"></div>
</div>
</template>

<script>
import {
  setFocusedUserId,
} from '../../vuex/actions';

export default {
  name: 'UnfocusedUserWindows',

  vuex: {
    actions: {
      setFocusedUserId,
    },
    getters: {
      users: (state) => state.users,
      userLength: (state) => state.userLength,
      focusedUserId: (state) => state.focusedUserId,
    },
  },
};
</script>

<style lang="stylus">
.unfocused-user-windows
  &__item
    display inline-block
    height 90px
    width 120px
    margin 0 20px
    vertical-align top
    border 1px solid white
    border-radius 2px
    transition all 0.2s
    &:hover
      box-shadow 0px 0px 15px 2px rgba(255,255,255,1)
</style>
