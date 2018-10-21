import { Request, Response, NextFunction } from 'express';

import { httpLog } from '@modules/Log';

const FORMAT = '[%s] url: %s, params: %j, body: %j, headers: %j';

export default function httpLogger(req: Request, res: Response, next: NextFunction) {
  httpLog.info(FORMAT, new Date(), req.url, req.params, req.body, req.headers);

  next();
};
