<template>
<div id="focused-user-background"></div>
</template>

<script>


export default {
  name: 'FocusedUserBackground',

  vuex: {
    getters: {
      user: (state) => {
        for (let i = 0; i < state.users.length; i++) {
          if (state.users[i].id === state.focusedUserId) {
            return state.users[i];
          }
        }
        return null;
      },
    },
  },

  watch: {
    user: (focusedUser) => {
      focusedUser.stream.play('focused-user-background');
    },
  },

  ready() {
    // if (this.user.stream) {
    //   this.client.unpublish(this.user.stream, (err) => {
    //     this.removeUserStream(this.user.id);
    //     console.log('Unpublish failed with error: ', err);
    //   });
    // }
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
