import { 
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';

import ApiResult from '@models/ApiResult';
import { API } from '@models/ApiURL';
import AppError from '@models/AppError';
import Cookie from '@models/Cookie';
import Crypt from '@modules/Crypt';
import HttpStatus from '@constants/HttpStatus';
import { expressLog } from '@modules/Log';
import ResponseType from '@models/ResponseType';
import routeMapDefault from './default/routeMap.default';
import routeMapper from '@externalModules/routeMapper/routeMapper';
// import routeMap1 from './v1/routeMap.v1';

const routeDefinitions = [
  {
    map: routeMapDefault,
    mapPath: API.DEFAULT,
    postAsyncHandlers: [
      respond,
    ],
  },
];

export default function routes(app: Application) {
  routeMapper(app, routeDefinitions);
  return app;
}

function validatePayload(req: Request, res: Response, next: NextFunction) {
  return function (apiResult: ApiResult<any>) {
    if (apiResult === undefined) {
      throw AppError.of({
        type: ResponseType.RESPONSE_NOT_PROVIDED,
      });
    }

    if (!(apiResult instanceof ApiResult)) {
      throw AppError.of({
        args: [ apiResult ],
        type: ResponseType.RESPONSE_TYPE_NOT_API_RESULT,
      });
    }

    return apiResult;
  }
}

function setCookie(req: Request, res: Response, next: NextFunction) {
  return function (apiResult: ApiResult<any>) {
    const cookies = apiResult.getCookies();
    if (cookies.length > 0) {
      expressLog.debug('Cookies (%s) are set: %j', cookies.length, cookies);

      apiResult.getCookies()
        .map((cookie: Cookie) => {
          res.cookie(cookie.key, cookie.value, {
            httpOnly: true,
            maxAge: cookie.maxAge,
          });
      });
    }
    return apiResult;
  }
}

function respond(req: Request, res: Response, next: NextFunction) {
  return function (apiResult: ApiResult<any>) {
    res.status(HttpStatus.SUCCESS)
      .send({
        code: ResponseType.SUCCESS.code,
        payload: apiResult,
      });

    return apiResult;
  }
}
