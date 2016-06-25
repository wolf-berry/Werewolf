/* Connect to mysql instance.
 * Then initialize and export a connection pool.
 */
import knex from 'knex';
import assert from 'assert';

import config from './configs';
import log from './log';

log.info(`Initialize mysql connection pool to ${config.mysql.host}`);

if (config.env === 'production') {
  assert(config.mysql.host, 'No mysql host provided!');
  assert(config.mysql.db, 'No mysql db provided!');
  assert(config.mysql.user, 'No mysql user provided!');
  assert(config.mysql.password, 'No mysql password provided!');
}

const db = knex({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.db,
    multipleStatements: true,
  },
});

if (!db) {
  log.warn('Connection to mysql failed');
}

export default db;
