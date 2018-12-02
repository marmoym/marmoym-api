import { Request, Response, NextFunction } from  'express';

import { expressLog } from '@@modules/Log';
import AppError from '@@models/AppError';
import ResponseType from '@@models/ResponseType';

export default function routeNoMatchHandlerr(req: Request, res: Response, next: NextFunction) {
  next(AppError.of({
    responseType: ResponseType.ROUTE_NOT_DEFINED,
  }));
}
