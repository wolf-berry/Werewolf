import Vue from 'vue';
import Router from 'vue-router';

import App from './App';
import GameHall from './features/game-hall/GameHall';
import GameRoom from './features/game-room/GameRoom';

import Test from './features/test/Test';

Vue.config.debug = true;
Vue.use(Router);

const router = new Router();

router.map({

  '/game-hall': {
    name: 'game-hall',
    component: GameHall,
  },

  '/game-room/:roomId': {
    name: 'game-room',
    component: GameRoom,
  },

  '/test': {
    name: 'test',
    component: Test,
  },

});

router.redirect({
  '/': '/game-hall',
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

router.start(App, '#app');
