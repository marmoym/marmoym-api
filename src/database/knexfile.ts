import * as path from 'path';

import dbConfig from '@config/dbConfig';

const MIGRATION_PATH = path.resolve(__dirname, 'migrations');
const SEED_PATH = path.resolve(__dirname, 'seeds');

console.log(123, dbConfig);
const knexfile = {
  ...dbConfig,
};

console.log(1234, knexfile);
knexfile.development.migrations = {
  directory: MIGRATION_PATH
};

knexfile.development.seeds = {
  directory: SEED_PATH
};

export default knexfile;