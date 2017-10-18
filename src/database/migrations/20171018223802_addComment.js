exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Comment', function(table) {
      table.increments('id').primary();
      table.integer('parent_id').defaultTo('0');
      table.string('target_type', 1).notNullable();
      table.integer('target_id').notNullable();
      table.string('label', 512).notNullable();
      table.integer('user_id').notNullable();
      table.integer('vote_id').notNullable();
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  
};
