import definitionSeedData from './data/development/definition';
import definitionPosSeedData from './data/development/definitionPos';
import usageSeedData from './data/development/usage';
import definitionUsageSeedData from './data/development/definitionUsage';
import originSeedData from './data/development/origin';
import Definition from '@entities/Definition';
import DefinitionPos from '@entities/DefinitionPos';
import DefinitionUsage from '@entities/DefinitionUsage';
import Origin from '@entities/Origin';
import Usage from '@entities/Usage';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(Definition._NAME).truncate()
    .then(function () {
      return knex(DefinitionPos._NAME).truncate()
    })
    .then(function () {
      return knex(DefinitionUsage._NAME).truncate()
    })
    .then(function () {
      return knex(Origin._NAME).truncate()
    })
    .then(function () {
      // Inserts seed entries
      return knex(Definition._NAME).insert(definitionSeedData);
    })
    .then(function () {
      return knex(DefinitionPos._NAME).insert(definitionPosSeedData);
    })
    .then(function () {
      return knex(Usage._NAME).insert(usageSeedData);
    })
    .then(function () {
      return knex(DefinitionUsage._NAME).insert(definitionUsageSeedData);
    })
    .then(function () {
      return knex(Origin._NAME).insert().insert(originSeedData);
    });
};
