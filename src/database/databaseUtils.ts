import * as winston from 'winston';

import db from './index';

export const transaction = (func) => {
  return db.transaction((trx) => {
    return func(trx)
  }).then(res => {
    return res;
  })
  .catch(err => {
    winston.error(err);
    throw new Error();
  })
}