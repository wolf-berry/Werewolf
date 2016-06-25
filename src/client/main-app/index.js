import Vue from 'vue';
import Router from 'vue-router';

import App from './App';
import GameHall from './features/game-hall/GameHall';
import GameRoom from './features/game-room/GameRoom';

Vue.config.debug = true;
Vue.use(Router);

const router = new Router();

router.map({

  '/game-hall': {
    name: 'game-hall',
    component: GameHall,
  },

  '/game-room': {
    name: 'game-room',
    component: GameRoom,
  },

});

router.redirect({
  '/': '/game-hall',
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

router.start(App, '#app');
