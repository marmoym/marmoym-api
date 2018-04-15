import * as path from 'path';

import dbConfig from '@config/dbConfig';

const MIGRATION_PATH = path.resolve(__dirname, 'migrations');
const SEED_PATH = path.resolve(__dirname, 'seeds');

const knexfile = {
  ...dbConfig,
};

knexfile.development.migrations = {
  directory: MIGRATION_PATH,
  debug: true,
};

knexfile.development.seeds = {
  directory: SEED_PATH,
  debug: true,
};

export default knexfile;