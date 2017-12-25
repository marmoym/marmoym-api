const knex = require('knex');

const config = require('./knexfile.js');  
const logger = require('@src/modules/logger');

const _knex = knex(config[process.env.NODE_ENV]);

const arg = process.argv[2];

if (arg === '--migrate') {
  logger.info('--migrate');
  _knex.migrate.latest().then(res => {
    logger.log('debug', 'MIGRATION COMPLETE');
    logger.log('debug', 'RESULT', res);
  });
} else if (arg === '--rollback') {
  logger.info('--rollback');
  _knex.migrate.rollback().then(res => {
    logger.log('debug', 'ROLLBACK COMPLETE');
    logger.log('debug', 'RESULT', res);
  });
} else if (arg === '--seed') {
  logger.info('--seed');
  _knex.seed.run().then(res => {
    logger.log('debug', 'SEED COMPLETE');
    logger.log('debug', 'RESULT', res);
  });
}

module.exports = knex;
