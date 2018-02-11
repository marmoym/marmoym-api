import * as knex from 'knex';

import knexFile from './knexFile';
import logger from '@src/modules/logger';

const _knex = knex(knexFile[process.env.NODE_ENV]);

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

export default knex;
