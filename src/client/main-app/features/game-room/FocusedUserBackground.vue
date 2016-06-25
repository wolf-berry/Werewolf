<template>
<div id="focused-user-background"></div>
</template>

<script>
export default {
  name: 'FocusedUserBackground',

  vuex: {
    getters: {
      user: (state) => state.users[state.focusedUserId],
    },
  },
};
</script>

<style lang="stylus">
#focused-user-background
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
