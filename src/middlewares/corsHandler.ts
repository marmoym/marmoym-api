import cors from 'cors';

import appConfig from '@config/marmoymConfig';
import AppError from '@models/AppError';
import { expressLog } from '@modules/Log';
import ResponseType from '@models/ResponseType';

export default function corsHandler() {
  return [
    // https://github.com/expressjs/cors/issues/71#issuecomment-279661081
    (req, res, next) => {
      req.headers.origin = req.headers.origin || req.headers.host;
      next();
    },
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (appConfig.cors.whitelist['indexOf'](origin) !== -1) {
          callback(null, true);
        } else {
          expressLog.warn('Request origin not listed in whitelist: %s', origin);
          callback(null, true);
          // process.env.NODE_ENV === 'development'
          //   ? callback(null, true)
          //   : callback(AppError.ofType(ResponseType.REQUEST_ORIGIN_INVALID, origin));
        }
      },
    }),
  ];
};
