let importedConfig: MarmoymConfig;

try {
  importedConfig = require('./marmoym-config/config');
} catch (err) {
  console.error(`'marmoym-config' is not present. The repo is accessible with the previlege.
It is possible, however, to setup a local configuration to launch the app. You are advised to modify 
marmoymConfig in whichever you want.`);
  importedConfig = {
    app: {},
    auth: {},
    cors: {},
    db: {},
  };
}

const dbConfigBase = {
  database: 'test',
  host: 'localhost',
  password: 'test',
  poolMax: 5,
  poolMin: 0,
  port: 3306,
  username: 'test',
  type: 'postgres',
};

const marmoymConfig: MarmoymConfig = {
  app: {
    port: 4001,
  },
  auth: {
    ...importedConfig.auth,
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
      ...(importedConfig.db['db1'] ? importedConfig.db['db1'] : {}),
    },
  },
};

export default marmoymConfig;

interface MarmoymConfig {
  app,
  auth,
  cors,
  db: {
    [dbName: string]: {
      [env: string]: {
        database: string,
        host: string,
        password: string,
        poolMax: number,
        poolMin: number,
        port: number,
        username: string,
        type: string,
      },
    },
  },
}
