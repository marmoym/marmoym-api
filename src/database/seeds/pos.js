const posSeedData = require('./data/development/pos');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Pos').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pos').insert(posSeedData);
    });
};
