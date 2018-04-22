import Logger from '@src/modules/Logger';

export default function errorHandler(err, req, res, next) {
  if (err.constructor.name === 'MarmoymError') {
    Logger.error('[ErrorHandler]', err);
    res.send({
      code: err.code,
      msg: err.msg,
    });
  } else {
    Logger.error(err);
    res.send({
      code: '000000',
      msg: 'Internal Error',
    });
  }
};
