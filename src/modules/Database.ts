import { createConnections } from "typeorm";
import * as path from 'path';

import marmoymConfig from '@config/marmoymConfig';
import Logger from '@modules/Logger';

const dbConfig = marmoymConfig.db;
const ENTITIES_PATH = path.resolve(__dirname, '../entities');
const env = process.env.NODE_ENV || 'development';

export default class Database {
  static initialize() {
    return createConnections([
      {
        name: DB1,
        entities: [
          `${ENTITIES_PATH}/**/*.js`
        ],
        logging: env === 'development' ? true : false,
        synchronize: true,
        ...dbConfig[DB1][env],
      }
    ]).then((connections) => {
      Logger.info(
        'Total %d Connections: %j', 
        connections.length, 
        connections.map((c) => c.options));

      return connections;
    }).catch((err) => {
      Logger.error('Failed to connect to DB: %o', err);
      throw err;
    })
  }
}

export const DB1 = 'db1';
