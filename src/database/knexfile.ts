import * as path from 'path';

import marmoymConfig from '@config/marmoymConfig';

const MIGRATION_PATH = path.resolve(__dirname, 'migrations');
const SEED_PATH = path.resolve(__dirname, 'seeds');

const knexfile = {
  ...marmoymConfig.db,
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