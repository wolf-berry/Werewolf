/**
 * Passport configuration.
 */

import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import db from './db';
import log from './log';
import util from './util';

import game from './controllers/game';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user;
  db.select()
  .from('users')
  .where('id', id)
  .then((users) => {
    if (users.length === 0) {
      // no such user exists
      done(null, false);
    }
    user = users[0];
    return game.getUserGameHelper(user.id);
  })
  .then((_game) => {
    user.game = _game;
    // successfully find the logged-in user
    done(null, util.camelizeKeys(user));
  })
  .catch((err) => {
    log.error(err);
    done(err);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  db.select().from('users').where({ username: username })
  .then((users) => {
    if (users.length === 0) {
      // no such user exists
      return done(null, false, { message: '该用户不存在' });
    }
    const user = util.camelizeKeys(users[0]);
    const salt = new Buffer(user.salt, 'base64');
    const encryptPassword = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    if (encryptPassword !== user.hashedPassword) {
      // wrong password
      return done(null, false, { message: '密码错误' });
    }
    done(null, user);
  })
  .catch((err) => {
    log.error(err);
    done(err);
  });
}));
