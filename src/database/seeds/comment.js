const Comment = require('@models/Comment').default;
const CommentPath = require('@models/CommentPath').default;
const commentSeed = require('./data/development/commentSeed');
const commentPathSeed = require('./data/development/commentPathSeed');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(Comment._NAME).truncate()
    .then(function () {
      return knex(CommentPath._NAME).truncate()
    })

    // Inserts seed entries
    .then(function () {
      return knex(Comment._NAME).insert(commentSeed);
    })
    .then(function() {
      return knex(CommentPath._NAME).insert(commentPathSeed);
    })
};
