import * as knex from 'knex';

import knexFile from './knexfile';
import Logger from '@src/modules/Logger';

const ENV = process.env.NODE_ENV;
Logger.info(`knex config: ${JSON.stringify(knexFile[ENV])}`);

export default knex(knexFile[ENV]);
