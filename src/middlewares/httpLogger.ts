import { Request, Response, NextFunction } from 'express';

import { httpLog } from '@modules/Log';

const FORMAT = '%s - params: %j, body: %j, user-agent: %j';

export default function httpLogger(req: Request, res: Response, next: NextFunction) {
  httpLog.info(
    FORMAT, 
    req.url, 
    req.params, 
    req.body, 
    req.headers['user-agent'],
  );

  next();
};
