import db from '../db';
import crypto from 'crypto';

// if exist delete them and dump into new table schema
db.schema
.hasTable('activities').then((exists) => {
  if (exists) {
    return db.schema.dropTable('activities');
  }
})
.then(() => {
  return db.schema
  .hasTable('game_user').then((exists) => {
    if (exists) {
      return db.schema.dropTable('game_user');
    }
  });
})
.then(() => {
  return db.schema
  .hasTable('games').then((exists) => {
    if (exists) {
      return db.schema.dropTable('games');
    }
  });
})
.then(() => {
  return db.schema
  .hasTable('users').then((exists) => {
    if (exists) {
      return db.schema.dropTable('users');
    }
  });
})
.then(() => {
  return db.schema
  .createTable('users', (table) => {
    table.integer('id').primary().unsigned().notNullable();
    table.string('username').comment('user name');
    table.string('hashed_password').comment('hashed password');
    table.string('salt').comment('random salt');
    table.integer('score').comment('total score');
  });
})
.then(() => {
  return db.schema
  .createTable('games', (table) => {
    table.integer('id').primary().unsigned().notNullable();
    table.boolean('status').comment('0 for stop, 1 for in progress');
    table.string('channel').comment('video channel');
    table.text('content').comment('content of game');
  });
})
.then(() => {
  return db.schema
  .createTable('activities', (table) => {
    table.integer('game_id').unsigned().comment('id of game');
    table.foreign('game_id').references('games.id').onDelete('SET NULL').onUpdate('CASCADE');
    table.integer('type').comment('type of activity');
    table.text('content').comment('content for current activity');
    table.timestamp('started_at').nullable();
    table.timestamp('ended_at').nullable();
  });
})
.then(() => {
  return db.schema
  .createTable('game_user', (table) => {
    table.integer('game_id').unsigned().comment('id of game');
    table.foreign('game_id').references('games.id').onDelete('SET NULL').onUpdate('CASCADE');
    table.integer('user_id').unsigned().comment('id of user');
    table.foreign('user_id').references('users.id').onDelete('SET NULL').onUpdate('CASCADE');
    table.integer('index').unsigned().comment('index of userin current game');
    table.integer('role').nullable().comment('role of user in current game');
    table.integer('alive').nullable().comment('whether alive in current game');
    table.integer('result').nullable().comment('result of current game');
  });
})
.then(() => {
  // add a default user
  const username = 'a@a.com';
  const salt = crypto.randomBytes(16).toString('base64');
  const bufferSalt = new Buffer(salt, 'base64');
  const hashedPassword = crypto.pbkdf2Sync('123', bufferSalt, 10000, 64).toString('base64');
  return db('users')
  .insert({ username, hashed_password: hashedPassword, salt });
})
.then(() => {
  console.log('导入数据完成啦♪(^∇^*)');
});
