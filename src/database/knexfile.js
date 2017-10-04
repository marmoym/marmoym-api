const dbConfig = require('../../src/config/marmoym-config').dbConfig;
const path = require('path');

const _config = dbConfig.marmoym_dev1;
const MIGRATION_PATH = path.resolve(__dirname, 'migrations');

_config.development.migrations = {
  directory: MIGRATION_PATH
};

module.exports = _config;