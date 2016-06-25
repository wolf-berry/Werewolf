// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'wolf',
      user: 'root',
      password: '',
      host: 'localhost',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: process.env.STAGING_SQL_DB,
      user: process.env.STAGING_SQL_USER_NAME,
      password: process.env.STAGING_SQL_PW,
      host: process.env.STAGING_SQL_HOST_NAME,
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: process.env.SQL_DB,
      user: process.env.SQL_USER_NAME,
      password: process.env.SQL_PW,
      host: process.env.SQL_HOST_NAME,
    },
  },
};
