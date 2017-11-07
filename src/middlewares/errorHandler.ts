import * as logger from '@src/modules/logger';

export function handleError(err, req, res, next) {
  if (err.constructor.name === 'MarmoymError') {
    logger.error('[ErrorHandleService]', err);
    res.send({
      code: err.code,
      msg: err.msg,
    });
  } else {
    logger.error(err);
    res.send({
      code: '000000',
      msg: 'Internal Error',
    });
  }
};