import { Request, Response, NextFunction } from 'express';

import Logger from '@modules/Logger';

const FORMAT = '[%s] url: %s, params: %j, body: %j, headers: %j';

export default function httpLogger(req: Request, res: Response, next: NextFunction) {
  Logger.info(FORMAT, new Date(), req.url, req.params, req.body, req.headers);
  next();
};
