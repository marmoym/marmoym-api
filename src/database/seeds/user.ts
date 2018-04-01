import userSeedData from './data/development/user';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert(userSeedData);
    });
};
