const definitionSeedData = require('./data/development/definition');
const definitionPosSeedData = require('./data/development/definitionPos');
const usageSeedData = require('./data/development/usage');
const definitionUsageSeedData = require('./data/development/definitionUsage');
const originSeedData = require('./data/development/origin');

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
