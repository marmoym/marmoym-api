import Comment from '@entities/Comment';
import CommentPath from '@entities/CommentPath';
import commentSeed from './data/development/commentSeed';
import commentPathSeed from './data/development/commentPathSeed';

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
