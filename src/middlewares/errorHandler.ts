import chalk from 'chalk';
import { format } from 'util';

import AppError from '@@models/AppError';
import { expressLog } from '@@modules/Log';
import HttpStatus from '@@constants/HttpStatus';
import { isProduction } from '@@src/env';
import ResponseType from '@@models/ResponseType';

export default function errorHandler(err: Error, req, res, next) {
  try {
    if (!(err instanceof Error)) {
      err = AppError.of({
        responseType: ResponseType.NOT_ERROR_OBJECT,
      });
    }

    expressLog.error(
      errorMsg,
      req.url,
      err.constructor.name,
      err['label'],
      err['desc'],
      err.stack,
    );

    res.status(HttpStatus.ERROR)
      .send({
        code: err['code'],
        ...!isProduction && { message: err['desc'] },
      });
  } catch (err) {
    res.status(HttpStatus.ERROR)
      .send({
        code: ResponseType.SERVER_INTERNAL_ERROR,
        desc: 'Error while processing error that has happened before',
      });
  }
}

const errorMsg =
`[errorHandler] Error handling %s
Error instance: %s, label: ${chalk.yellow('%s')}, desc: %s
Error stack: %s`;
