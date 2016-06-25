import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import passport from 'passport';
import session from 'express-session';
import SessionStore from 'express-mysql-session';

import log from './log';
import router from './router';
import config from '../../webpack.dev.config';
import configs from './configs';
// import socket from './socket';
import './passport';

const app = express();

// const http = require('http').Server(app);

// http.listen(configs.port, () => {
//   log.info(`Server started. Listening on port ${http.address().port}`);
// });

// socket.initSocket(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'wolf',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
  store: new SessionStore({
    host: configs.mysql.host,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.sessionDb,
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// will print stacktrace
app.use(function(err, req, res) {
  if (!res.status) {
    log.error(err);
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

app.listen(configs.port);

export default app;
