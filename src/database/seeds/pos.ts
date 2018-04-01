import posSeedData from './data/development/pos';
import Pos from '@entities/Pos';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(Pos._NAME).truncate()
    .then(function () {
      // Inserts seed entries
      return knex(Pos._NAME).insert(posSeedData);
    });
};
