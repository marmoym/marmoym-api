import Logger from '@modules/Logger';

let config = {
  auth: {},
  db: {
    development: {},
    production: {},
  },
};

try {
  config = require('./marmoym-config/config').default;
} catch (err) {
  Logger.error(`'marmoym-config' is not present. The repo is accessible with the previlege.
It is possible, however, to setup a local configuration to launch the app. You are advised to modify 
marmoymConfig in whichever you want.`);
}

const dbConfigBase = {
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
};

export default {
  app: {
    port: 4001,
  },
  auth: {
    ...config.auth,
    privateKey: 'abcd',
    saltRound: 5,
    tokenDuration: '1d',
  },
  cors: {
    whitelist: [
      'http://localhost',
    ],
  },
  db: {
    db1: {
      development: {
        ...dbConfigBase,
      },
      production: {
        ...dbConfigBase,
      },
      ...(config.db['db1'] ? config.db['db1'] : {}),
    },
  },
};
