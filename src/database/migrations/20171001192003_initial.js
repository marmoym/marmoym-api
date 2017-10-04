exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Term', function(table) {
      table.increments('id').primary();
      table.string('label', 255);
      table.string('roman', 255);
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('Definition', function(table) {
      table.increments('id').primary();
      table.string('label', 512);
      table.string('status', 1).defaultTo('N');
      table.integer('term_id').notNullable();
      table.integer('user_id').notNullable();
      table.integer('vote_id').notNullable();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('User', function(table) {
      table.increments('id').primary();
      table.string('username', 32).notNullable();
      table.string('password', 256).notNullable();
      table.string('email', 128).notNullable();
      table.integer('karma', ).defaultTo(0);
      table.string('status', 1).defaultTo('P');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('Vote', function(table) {
      table.increments('id').primary();
      table.string('target_type', 1).notNullable();
      table.integer('target_id').notNullable();
      table.integer('upvote_count').defaultTo(0);
      table.integer('downvote_count').defaultTo(0);
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('VoteRecord', function(table) {
      table.increments('id').primary();
      table.string('target_type', 1).notNullable();
      table.integer('target_id').notNullable();
      table.integer('user_id').notNullable();
      table.integer('action').defaultTo(0);

      table.timestamps(true, true);
    }),

    knex.schema.createTable('Origin', function(table) {
      table.increments('id').primary();
      table.string('label', 512).notNullable();
      table.string('status', 1).defaultTo('N');
      table.integer('def_id').notNullable();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('Pos', function(table) {
      table.increments('id').primary();
      table.string('label', 512).notNullable();
      table.string('labelEn', 512).notNullable();
      table.integer('def_id').notNullable();
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('DefinitionPos', function(table) {
      table.increments('id').primary();
      table.integer('def_id').notNullable();
      table.integer('pos_id').notNullable();
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('Usage', function(table) {
      table.increments('id').primary();
      table.integer('no').defaultTo(1);
      table.string('label', 512).notNullable();
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('DefinitionUsage', function(table) {
      table.increments('id').primary();
      table.integer('def_id').notNullable();
      table.integer('usage_id').notNullable();
      table.string('status', 1).defaultTo('N');

      table.timestamps(true, true);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Term'),
    knex.schema.dropTable('Definition'),
    knex.schema.dropTable('User'),
    knex.schema.dropTable('Vote'),
    knex.schema.dropTable('VoteRecord'),
    knex.schema.dropTable('Origin'),
    knex.schema.dropTable('Pos'),
    knex.schema.dropTable('DefinitionPos'),
    knex.schema.dropTable('Usage'),
    knex.schema.dropTable('DefinitionUsage')
  ]);  
};