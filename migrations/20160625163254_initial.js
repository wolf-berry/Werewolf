
exports.up = function(knex) {
  return knex.schema
  .createTable('users', (table) => {
    table.integer('id').primary().unsigned().notNullable();
    table.string('name').comment('user name');
    table.string('hashed_password').comment('hashed password');
    table.string('salt').comment('random salt');
    table.integer('score').comment('total score');
  })
  .then(() => {
    return knex.schema
    .createTable('games', (table) => {
      table.integer('id').primary().unsigned().notNullable();
      table.boolean('status').comment('0 for stop, 1 for in progress');
      table.string('user_ids').comment('array of user ids');
      table.string('channel').comment('video channel');
      table.text('content').comment('content of game');
    });
  })
  .then(() => {
    return knex.schema
    .createTable('activities', (table) => {
      table.integer('game_id').unsigned().comment('id of game');
      table.foreign('game_id').references('games.id').onDelete('SET NULL').onUpdate('CASCADE');
      table.integer('type').comment('type of activity');
      table.text('content').comment('content for current activity');
      table.timestamp('started_at').nullable();
      table.timestamp('ended_at').nullable();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games')
  .then(() => {
    return knex.schema.dropTable('activities');
  })
  .then(() => {
    return knex.schema.dropTable('users');
  });
};
