import { createConnections } from "typeorm";
import * as path from 'path';

import marmoymConfig from '@config/marmoymConfig';

const dbConfig = marmoymConfig.db;
const ENTITIES_PATH = path.resolve(__dirname, 'entities');
const env = process.env.NODE_ENV || 'development';

export default function db() {
  return createConnections([
    {
      name: DB1,
      entities: [
        `${ENTITIES_PATH}/**/*.js`
      ],
      synchronize: true,
      ...dbConfig[DB1][env],
    },
  ]);
};

export const DB1 = 'db1';
