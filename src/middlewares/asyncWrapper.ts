import ApiResult, { IS_API_RESULT } from '@models/ApiResult';
import AppError from '@models/AppError';
import HttpStatus from '@constants/HttpStatus';
import Logger from '@modules/Logger';
import ResponseType from '@models/ResponseType';

export default function asyncWrapper(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((payload) => {
        if (!(payload[IS_API_RESULT])) {
          throw AppError.of({
            args: [ payload ],
            type: ResponseType.RESPONSE_TYPE_UNDEFINED,
          });
        }

        // Set cookie in the response header
        const cookies = payload.getCookies();
        if (cookies.length > 0) {
          Logger.debug('Cookies (%s) is set: %j', cookies.length, cookies);
          payload.getCookies().map((cookie) => {
            res.cookie(cookie.key, cookie.value, {
              httpOnly: true,
              maxAge: cookie.maxAge,
            });
          });
        }

        res.status(HttpStatus.SUCCESS)
          .send({
            code: ResponseType.SUCCESS.code,
            payload,
          });
      })

      /**
       * Delegate the error processing to errorHandler (@see errorHandler)
       */
      .catch((err) => {
        next(err);
      });
  };
};

const VERSION = '__version';
asyncWrapper[VERSION] = '0.0.1';
