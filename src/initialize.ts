// For TypeORM
import "reflect-metadata";

import db from '@database/db';
import Logger from '@modules/Logger';
import marmoymConfig from '@config/marmoymConfig';
import Token from '@modules/Token';

export default async function initialize() {
  Token.initialize({
    privateKey: marmoymConfig.auth.privateKey,
    tokenDuration: marmoymConfig.auth.tokenDuration,
  });

  const conn = db();
  conn.then((connections) => {
    Logger.info('Total %d Connections: %j', connections.length, connections.map((c) => {
      return c.options;
    }));
    return connections;
  }).catch((err) => {
    Logger.error('Failed to connect to DB: %o', err);
  });

  return conn;
};
