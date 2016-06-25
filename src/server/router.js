import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main-app', { title: 'Express' });
});

router.get('/login', (req, res) => res.render('login'));

export default router;
