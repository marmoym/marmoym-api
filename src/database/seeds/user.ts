import userSeedData from './data/development/user';
import User from '@entities/User';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(User._NAME).truncate()
    .then(function () {
      // Inserts seed entries
      return knex(User._NAME).insert(userSeedData);
    });
};
