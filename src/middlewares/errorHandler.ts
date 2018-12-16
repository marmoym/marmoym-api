import chalk from 'chalk';
import { format } from 'util';

import ApiError from '@@models/ApiError';
import ApiResponse from '@@models/ApiResponse';
import { expressLog } from '@@modules/Log';
import HttpStatus from '@@constants/HttpStatus';
import { isProduction } from '@@src/env';
import ResponseType from '@@models/ResponseType';

export default function errorHandler(err: Error, req, res, next) {
  try {
    if (!(err instanceof Error)) {
      err = ApiError.of({
        responseType: ResponseType.NOT_ERROR_OBJECT,
      });
    }

    expressLog.error(
      errorMsg,
      req.url,
      err.constructor.name,
      err['label'],
      err['code'],
      err['desc'],
      err.stack,
    );

    res.status(HttpStatus.ERROR)
      .send(new ApiResponse(null, err as ApiError));

  } catch (err) {
    const error = ApiError.of({
      responseType: ResponseType.ERROR_WHILE_PROCESSING_ERROR,
    });

    res.status(HttpStatus.ERROR)
      .send(new ApiResponse(null, error));
  }
}

const errorMsg =
`[errorHandler] Error handling %s
Error instance: %s, label: ${chalk.yellow('%s (%s)')}, desc: %s
Error stack: %s`;
