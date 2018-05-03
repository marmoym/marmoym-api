import ApiResult, { IS_API_RESULT } from '@models/ApiResult';
import AppError from '@models/AppError';
import HttpStatus from '@constants/HttpStatus';
import Logger from '@modules/Logger';
import ResponseType from '@models/ResponseType';

const VERSION = '__version';

export default function asyncWrapper(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((payload) => {
        if (payload === undefined) {
          throw AppError.of({
            type: ResponseType.RESPONSE_NOT_PROVIDED,
          });
        }

        if (!(payload[IS_API_RESULT])) {
          throw AppError.of({
            args: [ payload ],
            type: ResponseType.RESPONSE_TYPE_NOT_API_RESULT,
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
            payload: payload.toJSON(),
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

asyncWrapper[VERSION] = '0.0.3';
