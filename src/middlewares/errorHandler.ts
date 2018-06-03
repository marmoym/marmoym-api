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
    err.code = ResponseType.RESPONSE_TYPE_NOT_API_RESULT.code;
    err.label = ResponseType.RESPONSE_TYPE_NOT_API_RESULT.label;
    err.desc = ResponseType.RESPONSE_TYPE_NOT_API_RESULT.desc;
  }

  Logger.error('[%s] %s', err.code, err.label);
  Logger.debug('[%s] %s\n%s', err.code, err.label, err.stack);

  res.status(HttpStatus.ERROR)
    .send({
      code: err.code,
      ...!PROD_ENV ? { message: err.desc }: {},
    });
};
