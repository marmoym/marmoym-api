import cors from 'cors';
import {
  NextFunction,
  Request,
  Response,
  RequestHandler
 } from 'express';

import marmoymConfig from '@@config/marmoymConfig';
import { expressLog } from '@@modules/Log';

export default function corsHandlerWrapper(): RequestHandler {
  expressLog.info('corsHandler() with: %o', marmoymConfig.cors);

  return function corsHandler(req: Request, res: Response, next: NextFunction) {
    // https://github.com/expressjs/cors/issues/71#issuecomment-279661081
    req.headers.origin = req.headers.origin || req.headers.host;

    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (marmoymConfig.cors.whitelist['indexOf'](origin) !== -1) {
          callback(null, true);
        } else {
          expressLog.warn('Request origin not listed in whitelist: %s', origin);
          callback(null, true);
          // process.env.NODE_ENV === 'development'
          //   ? callback(null, true)
          //   : callback(ApiError.ofType(ResponseType.REQUEST_ORIGIN_INVALID, origin));
        }
      },
    })(req, res, next);
  };
}
