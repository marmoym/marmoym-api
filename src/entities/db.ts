import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';

import { dbLog } from '@modules/Log';
import marmoymConfig from '@config/marmoymConfig';
import * as paths from '@src/paths';

const basename = path.basename(__filename);
const db: DB = {
  sequelize: undefined,
};
const dbEnv = process.env.DB || process.env.NODE_ENV || 'development';
const dbConfig = marmoymConfig.db['default'][dbEnv];

dbLog.info('dbConfig is retrieved in dbEnv: %s,\n%o', dbEnv, dbConfig);

const sequelize = new Sequelize({
  database: dbConfig.database,
  dialect: dbConfig.type,
  host: dbConfig.host,
  operatorsAliases: false,
  password: dbConfig.password,
  pool: {
    acquire: 30000,
    idle: 10000,
    max: dbConfig.poolMax,
    min: dbConfig.poolMin,
  },
  port: dbConfig.port,
  username: dbConfig.username,
});

fs
  .readdirSync(paths.distEntities)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const filePath = path.join(paths.distEntities, file);
    const entity = sequelize['import'](filePath);
    dbLog.info('entity is imported by sequelize. File: %s, EntityName: %s', file, entity.name);
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

export default db;

export async function initializeDB(): Promise<boolean> {
  try {
    await db.sequelize.authenticate();
    dbLog.info('authenticate() success, db is connectable');

    await db.sequelize.sync({
      // force: true,
    });
    dbLog.info('sync() success');

    return true;
  } catch (err) {
    dbLog.error('db authenticate() fail: %o', err);
    return false;
  }
}

interface DB {
  [entity: string]: any,
  sequelize,
}
