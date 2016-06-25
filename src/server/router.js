import express from 'express';
import path from 'path';

import game from './controllers/game';
import games from './controllers/games';
import session from './controllers/session';

const router = express.Router();

/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('main-app', { title: 'Express' });
// });

router.get('/game-hall', (req, res) => res.sendFile(path.join(__dirname, './public', 'index.html')));
router.get('/game-room', (req, res) => res.sendFile(path.join(__dirname, './public', 'meeting.html')));

/****** login ******/
router.get('/login', (req, res) => res.render('login'));
router.post('/login', session.login);
router.post('/logout', session.logout);

//router.put('/api/game/vote/:gameId', game);

/****** games *******/
router.post('/games/create', games.createGame);

export default router;
