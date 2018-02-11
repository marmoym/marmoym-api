import * as knex from 'knex';

import knexFile from './knexfile';
import logger from '@src/modules/logger';

const ENV = process.env.NODE_ENV;
const _knex = knex(knexFile[ENV]);
knexFile[ENV].debug = process.argv[2] === '--debug' ? true : false;

logger.info(`knex config: ${JSON.stringify(knexFile[ENV])}`);

export default _knex;
