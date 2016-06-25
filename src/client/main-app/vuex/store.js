import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Get login user
const currentUser = window.WEREWOLF ? window.WEREWOLF.data : { id: 1, email: 'demo@werewolf.com' };

const initialState = {
  currentUserId: currentUser.id,
  users: [currentUser],
  focusedUserId: null,
};

const mutations = {
  SET_FOCUSED_USER_ID (state, userId) {
    state.focusedUserId = userId;
  },

  ADD_USER (state, user) {
    for (let i = 0; i < state.users.length; i++) {
      if (state.users[i].id === user.id) {
        state.users[i] = user;
        return;
      }
    }
    state.users.push(user);
  },

  REMOVE_USER_STREAM (state, userId) {
    for (let i = 0; i < state.users.length; i++) {
      if (state.users[i].id === userId) {
        state.users[i].stream.close();
        state.users[i].stream = null;
        return;
      }
    }
  },

  SET_USER_STREAM (state, userId, stream) {
    for (let i = 0; i < state.users.length; i++) {
      if (state.users[i].id === userId) {
        if (state.users[i].stream) {
          state.users[i].stream.close();
        }
        state.users[i].stream = stream;
        return;
      }
    }
  },
};

export default new Vuex.Store({
  state: initialState,
  mutations,
});
