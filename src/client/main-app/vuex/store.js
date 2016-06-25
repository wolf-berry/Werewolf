import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Get login user
const user = window.WEREWOLF ? window.WEREWOLF.data : { email: 'demo@werewolf.com' };

const initialState = {
  user,
};

const mutations = {
  KILL (state, userId) {
    state.userStatus[userId] = 'died';
  },
};

export default new Vuex.Store({
  state: initialState,
  mutations,
});
