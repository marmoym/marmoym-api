import Comment from '@entities/Comment';
import CommentPath from '@entities/CommentPath';
import Term from '@entities/Term';
import Definition from '@entities/Definition';
import User from '@entities/User';
import Vote from '@entities/Vote';
import VoteInstance from '@entities/VoteInstance';
import Origin from '@entities/Origin';
import Pos from '@entities/Pos';
import DefinitionPos from '@entities/DefinitionPos';
import Usage from '@entities/Usage';
import DefinitionUsage from '@entities/DefinitionUsage';

export function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(Term._NAME, function(table) {
      table.increments(Term.ID).primary();
      table.string(Term.LABEL, 255);
      table.string(Term.ROMAN, 255);
      table.string(Term.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Definition._NAME, function(table) {
      table.increments(Definition.ID).primary();
      table.string(Definition.LABEL, 512);
      table.string(Definition.STATUS, 1).defaultTo('N');
      table.integer(Definition.TERM_ID).notNullable();
      table.integer(Definition.USER_ID).notNullable();
      table.integer(Definition.VOTE_ID).notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable(User._NAME, function(table) {
      table.increments(User.ID).primary();
      table.string(User.USERNAME, 32).notNullable();
      table.string(User.PASSWORD, 256).notNullable();
      table.string(User.EMAIL, 128).notNullable();
      table.integer(User.KARMA, ).defaultTo(0);
      table.string(User.STATUS, 1).defaultTo('P');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Vote._NAME, function(table) {
      table.increments(Vote.ID).primary();
      table.string(Vote.TARGET_TYPE, 1).notNullable();
      table.integer(Vote.TARGET_ID).notNullable();
      table.integer(Vote.UPVOTE_COUNT).defaultTo(0);
      table.integer(Vote.DOWNVOTE_COUNT).defaultTo(0);
      table.string(Vote.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(VoteInstance._NAME, function(table) {
      table.increments(VoteInstance.ID).primary();
      table.string(VoteInstance.TARGET_TYPE, 1).notNullable();
      table.integer(VoteInstance.TARGET_ID).notNullable();
      table.integer(VoteInstance.USER_ID).notNullable();
      table.integer(VoteInstance.ACTION).defaultTo(0);
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Origin._NAME, function(table) {
      table.increments(Origin.ID).primary();
      table.string(Origin.LABEL, 512).notNullable();
      table.string(Origin.STATUS, 1).defaultTo('N');
      table.integer(Origin.DEF_ID).notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Pos._NAME, function(table) {
      table.increments(Pos.ID).primary();
      table.string(Pos.LABEL, 512).notNullable();
      table.string(Pos.LABEL_EN, 512).notNullable();
      table.string(Pos.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(DefinitionPos._NAME, function(table) {
      table.increments(DefinitionPos.ID).primary();
      table.integer(DefinitionPos.DEF_ID).notNullable();
      table.integer(DefinitionPos.POS_ID).notNullable();
      table.string(Definition.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Usage._NAME, function(table) {
      table.increments(Usage.ID).primary();
      table.integer(Usage.NO).defaultTo(1);
      table.string(Usage.LABEL, 512).notNullable();
      table.string(Usage.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(DefinitionUsage._NAME, function(table) {
      table.increments(DefinitionUsage.ID).primary();
      table.integer(DefinitionUsage.DEF_ID).notNullable();
      table.integer(DefinitionUsage.USAGE_ID).notNullable();
      table.string(DefinitionUsage.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(Comment._NAME, function(table) {
      table.increments(Comment.ID).primary();
      table.integer(Comment.PARENT_ID).defaultTo('0');
      table.integer(Comment.GPARENT_ID).defaultTo('0');
      table.string(Comment.TARGET_TYPE, 1).notNullable();
      table.integer(Comment.TARGET_ID).notNullable();
      table.string(Comment.LABEL, 512).notNullable();
      table.integer(Comment.USER_ID).notNullable();
      table.integer(Comment.VOTE_ID).notNullable();
      table.string(Comment.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),

    knex.schema.createTable(CommentPath._NAME, function(table) {
      table.increments(CommentPath.ID).primary();
      table.integer(CommentPath.GPARENT_ID).defaultTo('0');
      table.text(CommentPath.PATH);
      table.string(CommentPath.STATUS, 1).defaultTo('N');
      table.timestamps(true, true);
    }),
  ]);
};

export function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(Term._NAME),
    knex.schema.dropTableIfExists(Definition._NAME),
    knex.schema.dropTableIfExists(User._NAME),
    knex.schema.dropTableIfExists(Vote._NAME),
    knex.schema.dropTableIfExists(VoteInstance._NAME),
    knex.schema.dropTableIfExists(Origin._NAME),
    knex.schema.dropTableIfExists(Pos._NAME),
    knex.schema.dropTableIfExists(DefinitionPos._NAME),
    knex.schema.dropTableIfExists(Usage._NAME),
    knex.schema.dropTableIfExists(DefinitionUsage._NAME),
    knex.schema.dropTableIfExists(Comment._NAME),
    knex.schema.dropTableIfExists(CommentPath._NAME),
  ]);
};
