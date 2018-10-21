import { format } from 'util';

import HttpStatus from '@constants/HttpStatus';
import { expressLog } from '@modules/Log';
import AppError from '@models/AppError';
import { PROD_ENV } from '@utils/envUtils';
import ResponseType from '@models/ResponseType';

export default function errorHandler(err, req, res, next) {
  if (!(err instanceof Error)) {
    err = AppError.of({
      type: ResponseType.NOT_ERROR_OBJECT,
    });
  }

  if (!(err instanceof AppError)) {
    const _err = err;
    err = ResponseType.RESPONSE_TYPE_NOT_API_RESULT;
    err.stack = format('Original object: %j', _err);
  }

  expressLog.error('[%s] %s\n%s', err.code, err.label, err.stack);

  res.status(HttpStatus.ERROR)
    .send({
      code: err.code,
      ...!PROD_ENV ? { message: err.desc }: {},
    });
};
