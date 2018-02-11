const path = require('path');

const dbConfig = require('@config/dbConfig').default;

const _config = dbConfig.marmoym_dev1;
const MIGRATION_PATH = path.resolve(__dirname, 'migrations');
const SEED_PATH = path.resolve(__dirname, 'seeds');

_config.development.migrations = {
  directory: MIGRATION_PATH
};

_config.development.seeds = {
  directory: SEED_PATH
};

module.exports = _config;