import termSeedData from './data/development/term';
import Term from '@entities/Term';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(Term._NAME).truncate()
    .then(function () {
      // Inserts seed entries
      return knex(Term._NAME).insert(termSeedData);
    });
};
