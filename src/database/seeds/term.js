const termSeedData = require('./data/development/term');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Term').del()
    .then(function () {
      // Inserts seed entries
      return knex('Term').insert(termSeedData);
    });
};
