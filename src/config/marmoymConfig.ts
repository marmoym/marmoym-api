import merge from 'webpack-merge';

import { expressLog } from '@@modules/Log';

let importedConfig = {};
try {
  importedConfig = require('./marmoym-config/config') as MarmoymConfig;
} catch (err) {
  console.error(`
'marmoym-config' is not present. The repo is accessible with the previlege.
It is possible, however, to setup a local configuration to launch the app. You are advised to modify
marmoymConfig in whichever you want.`);
}

const defaultConfig: MarmoymConfig = {
  app: {
    port: 4001,
  },
  auth: {
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
    default: {
      local: {
        database: 'marmoym-local',
        host: "localhost",
        password: "marmoym-local",
        poolMax: 5,
        poolMin: 0,
        port: 5432,
        type: "postgres",
        username: "marmoym-local",
      },
      'local-container': {
        database: 'marmoym-local',
        host: 'docker.for.mac.host.internal',
        password: "marmoym-local",
        poolMax: 5,
        poolMin: 0,
        port: 5432,
        type: "postgres",
        username: "marmoym-local",
      },
    }
  },
};

const marmoymConfig = merge(defaultConfig, importedConfig);
expressLog.info('marmoymConfig: %o', marmoymConfig);

export default marmoymConfig;

interface MarmoymConfig {
  app: SingleLevelObject,
  auth: AuthConfig,
  cors: SingleLevelObject,
  db: {
    [dbName: string]: {
      [dbEnv: string]: {
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

interface SingleLevelObject {
  [key: string]: string | number | Array<any>,
}

interface AuthConfig {
  privateKey: string,
  saltRound: number,
  tokenDuration: string,
}
