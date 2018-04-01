import definitionSeedData from './data/development/definition';
import definitionPosSeedData from './data/development/definitionPos';
import usageSeedData from './data/development/usage';
import definitionUsageSeedData from './data/development/definitionUsage';
import originSeedData from './data/development/origin';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Definition').truncate()
    .then(function () {
      return knex('DefinitionPos').truncate()
    })
    .then(function () {
      return knex('DefinitionUsage').truncate()
    })
    .then(function () {
      return knex('Origin').truncate()
    })
    .then(function () {
      // Inserts seed entries
      return knex('Definition').insert(definitionSeedData);
    })
    .then(function () {
      return knex('DefinitionPos').insert(definitionPosSeedData);
    })
    .then(function () {
      return knex('Usage').insert(usageSeedData);
    })
    .then(function () {
      return knex('DefinitionUsage').insert(definitionUsageSeedData);
    })
    .then(function () {
      return knex('Origin').insert().insert(originSeedData);
    });
};
