import log from './log';

// default environment to `development`
const env = process.env.NODE_ENV || 'development';

log.info(`Using ${env} environment...`);

let configs = {};

if (env === 'development') {
  configs = {
    env: 'development',
    port: 4567,
    mysql: {
      host: 'localhost',
      db: 'wolf',
      sessionDb: 'wolf_session',
      user: 'root',
      password: '',
    },
  };
} else if (env === 'production') {
  configs = {
    env: 'production',
    port: process.env.PORT,
    mysql: {
      host: process.env.SQL_HOST_NAME,
      db: process.env.SQL_DB,
      sessionDb: process.env.SESSION_DB,
      user: process.env.SQL_USER_NAME,
      password: process.env.SQL_PW,
    },
  };
}

export default configs;
