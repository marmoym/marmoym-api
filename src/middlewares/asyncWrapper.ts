import ApiResult from '@models/ApiResult';
// import DashboardError from '@models/DashboardError';
import HttpStatus from '@constants/HttpStatus';
// import Logger from '@modules/Logger';
import ResponseType from '@models/ResponseType';

export default function asyncWrap(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((payload) => {
        // if (!(payload instanceof ApiResult)) {
        //   throw DashboardError.ofType(null, ResponseType.NOT_RESULT_TYPE);
        // }

        // Set cookie in the response header
        // if (payload.cookies) {
        //   // Logger.debug('Cookie will be set %j', payload.cookies);
        //   payload.cookies.map((cookie) => {
        //     res.cookie(cookie.name, cookie.value, {
        //       httpOnly: true,
        //       maxAge: cookie.maxAge,
        //     });
        //   });
        //   delete payload.cookies;
        // }

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
