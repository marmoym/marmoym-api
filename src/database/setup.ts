import * as knex from 'knex';

import knexFile from './knexfile';
import Logger from '@src/modules/Logger';

const _knex = knex(knexFile[process.env.NODE_ENV]);

const arg = process.argv[2];

if (arg === '--migrate') {
  Logger.info('--migrate');
  _knex.migrate.latest().then(res => {
    Logger.log('debug', 'MIGRATION COMPLETE');
    Logger.log('debug', 'RESULT', res);
  });
} else if (arg === '--rollback') {
  Logger.info('--rollback');
  _knex.migrate.rollback().then(res => {
    Logger.log('debug', 'ROLLBACK COMPLETE');
    Logger.log('debug', 'RESULT', res);
  });
} else if (arg === '--seed') {
  Logger.info('--seed');
  _knex.seed.run().then(res => {
    Logger.log('debug', 'SEED COMPLETE');
    Logger.log('debug', 'RESULT', res);
  });
}

export default knex;
