import termSeedData from './data/development/term';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Term').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Term').insert(termSeedData);
    });
};
