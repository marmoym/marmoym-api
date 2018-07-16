import { Request, Response, NextFunction } from  'express';

import HttpStatus from '@constants/HttpStatus';
import Logger from '@src/modules/Logger';
import AppError from '@models/AppError';
import { PROD_ENV } from '@utils/envUtils';
import ResponseType from '@models/ResponseType';

export default function routeNoMatchHandlerr(req: Request, res: Response, next: NextFunction) {
  next(AppError.of({
    type: ResponseType.ROUTE_NOT_DEFINED,
  }));
};
