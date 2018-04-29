import { format } from 'util';

import HttpStatus from '@constants/HttpStatus';
import Logger from '@src/modules/Logger';
import AppError from '@models/AppError';
import { PROD_ENV } from '@utils/envUtils';
import ResponseType from '@models/ResponseType';

export default function errorHandler(err, req, res, next) {
  if (!(err instanceof Error)) {
    err = AppError.of({
      type: ResponseType.NOT_ERROR_OBJECT,
    });
  }

  if (!err.code) {
    err.code = ResponseType.RESPONSE_TYPE_UNDEFINED.code;
    err.message += ' ' + ResponseType.RESPONSE_TYPE_UNDEFINED.message;
  }

  // When TypeError, prints request information
  if (err.code === ResponseType.TYPE_ERROR.code) {
    err.message = format(err.message, req.query, req.body);
  }

  Logger.error('[%s] %s %s', err.code, err.name);
  Logger.debug('[%s] %s', err.code, err.stack);

  res.status(HttpStatus.ERROR)
    .send({
      code: err.code,
      ...!PROD_ENV ? { message: err.message }: {},
    })

};
