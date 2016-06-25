import express from 'express';

import game from './controllers/game';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main-app', { title: 'Express' });
});

router.get('/login', (req, res) => res.render('login'));

//router.put('/api/game/vote/:gameId', );

export default router;
