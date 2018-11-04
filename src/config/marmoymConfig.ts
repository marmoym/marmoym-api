const localEnv = process.env.LOCAL == 'true';

let marmoymConfig: MarmoymConfig = {
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
  db: {},
};

try {
  const importedConfig = require('./marmoym-config/config');
  marmoymConfig = importedConfig;
} catch (err) {
  console.error(`
'marmoym-config' is not present. The repo is accessible with the previlege.
It is possible, however, to setup a local configuration to launch the app. You are advised to modify
marmoymConfig in whichever you want.`);
}

const localDBConfig = {
  database: 'marmoym-local',
  host: "localhost",
  password: "marmoym-local",
  poolMax: 5,
  poolMin: 0,
  port: 5432,
  type: "postgres",
  username: "marmoym-local",
};

(function assignLocalDBSettings() {
  marmoymConfig.db['db1'] = {
    ...marmoymConfig.db['db1'],
    local: localDBConfig,
  };
})();

export default marmoymConfig;

interface MarmoymConfig {
  app: SingleLevelObject,
  auth: AuthConfig,
  cors: SingleLevelObject,
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

interface SingleLevelObject {
  [key: string]: string | number | Array<any>,
}

interface AuthConfig {
  privateKey: string,
  saltRound: number,
  tokenDuration: string,
}
