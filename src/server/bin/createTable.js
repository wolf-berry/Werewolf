
import db from '../db';


// if exist delete them and dump into new table schema
db.schema
.hasTable('activities').then((exists) => {
  if (exists) {
    return db.schema.dropTable('activities');
  }
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
  });
})
.then(() => {
  console.log('导入数据完成啦♪(^∇^*)');
});
