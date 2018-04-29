import Logger from '@modules/Logger';

let config = {};

try {
  config = require('./marmoym-config/config').default;
} catch (err) {
  Logger.error(`'marmoym-config' is not present. The repo is accessible with the previlege.
It is possible, however, to setup a local configuration to launch the app. You are advised to modify 
marmoymConfig in whichever you want.`);
}

const dbConfigBase = {
  client: 'pg',
  connection: {
    'host': 'localhost',
    'port': '5432',
    'user': 'marmoym',
    'password': 'marmoym1234',
    'database': 'marmoym_db',
    'charset': 'utf8',
  },
  debug: 'true',
  pool: {
    max: 8,
    min: 2,
  },
};

/**
 * ...
 */
const marmoymConfig = {
  app: {
    port: 4001,
  },
  auth: {
    hashSalt: 1234,
    privateKey: 'abcd',
    tokenDuration: '1d',
  },
  db: {
    development: {
      ...dbConfigBase,
    },
    production: {
      ...dbConfigBase,
    },
  },
  ...config,
};

export default marmoymConfig;
