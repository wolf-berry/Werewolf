/**
* Session related controllers.
*/
import passport from 'passport';

import log from '../log';

const login = (req, res, next) => {
  // customized authentication
  passport.authenticate('local', {
    badRequestMessage: '请填写邮箱/密码',
  }, (err, user, info) => {
    if (err) {
      log.error(err);
      return next(err);
    }
    if (!user) {
      return res.render('login', info);
    }
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.clearCookie('username');
  res.redirect('/login');
};

export default {
  login,
  logout,
};
