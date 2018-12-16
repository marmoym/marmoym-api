import { Request, Response, NextFunction } from  'express';

import { expressLog } from '@@modules/Log';
import ApiError from '@@models/ApiError';
import ResponseType from '@@models/ResponseType';

export default function routeNoMatchHandlerr(req: Request, res: Response, next: NextFunction) {
  next(ApiError.of({
    responseType: ResponseType.ROUTE_NOT_DEFINED,
  }));
}
