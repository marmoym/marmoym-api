import chalk from 'chalk';
import { format } from 'util';

import HttpStatus from '@constants/HttpStatus';
import { expressLog } from '@modules/Log';
import AppError from '@models/AppError';
import { PROD_ENV } from '@utils/envUtils';
import ResponseType from '@models/ResponseType';

export default function errorHandler(err, req, res, next) {
  try {
    expressLog.error('[errorHandler] Error at %s, Original cause:\n%o', req.url, err);

    if (!(err instanceof Error)) {
      err = AppError.of({
        type: ResponseType.NOT_ERROR_OBJECT,
      });
    }

    if (!(err instanceof AppError)) {
      err = ResponseType.RESPONSE_TYPE_NOT_API_RESULT;
    }

    expressLog.error(`[errorHandler] Error determined as ${chalk.red('[%s]')} %s`, err.code, err.label);

    res.status(HttpStatus.ERROR)
      .send({
        code: err.code,
        ...!PROD_ENV ? { message: err.desc }: {},
      });
  } catch (err) {
    res.status(HttpStatus.ERROR)
      .send({
        code: ResponseType.SERVER_INTERNAL_ERROR,
      });
  }
}
