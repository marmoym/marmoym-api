import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';

import { dbLog } from '@modules/Log';
import marmoymConfig from '@config/marmoymConfig';

const basename = path.basename(__filename);
const db: DB = {
  sequelize: undefined,
};
const dbEnv = process.env.DB || process.env.NODE_ENV || 'development';
const db1Config = marmoymConfig.db['db1'][dbEnv];

dbLog.info('dbConfig is retrieved in dbEnv: %s,\n%o', dbEnv, db1Config);

const sequelize = new Sequelize({
  database: db1Config.database,
  dialect: db1Config.type,
  host: db1Config.host,
  password: db1Config.password,
  pool: {
    acquire: 30000,
    idle: 10000,
    max: db1Config.poolMax,
    min: db1Config.poolMin,
  },
  port: db1Config.port,
  username: db1Config.username,
});

const ENTITY_PATH = __dirname + '/seq';

fs
  .readdirSync(ENTITY_PATH)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const entity = sequelize['import'](path.join(ENTITY_PATH, file));
    dbLog.info('entity is registered, filename: %s, entityName: %s', file, entity.name);
    db[entity.name] = entity;
  });

Object.keys(db)
  .forEach((entity) => {
    if (db[entity] && db[entity].associate) {
      dbLog.info('entity with association is linked, entity: %s', entity);
      db[entity].associate(db);
    }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

interface DB {
  [entity: string]: any,
  sequelize,
}

export default db;
