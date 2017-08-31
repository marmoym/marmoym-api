import * as winston from 'winston';

export const handleError = (err, req, res, next) => {
  if (err.constructor.name == 'MarmoymError') {
    winston.warn(err);
    res.send({
      code: err.code,
      msg: err.msg
    });
  } else {
    winston.error(err);
    res.send({
      code: '000000',
      msg: 'Internal Error'
    });
  }
};