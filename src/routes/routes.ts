import { 
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import { createRouter } from '@nodekit/route-mapper';

import ApiResult from '@models/ApiResult';
import { API } from '@models/ApiURL';
import AppError from '@models/AppError';
import Cookie from '@models/Cookie';
import HttpStatus from '@constants/HttpStatus';
import { expressLog } from '@modules/Log';
import ResponseType from '@models/ResponseType';
import routesDefault from './default/routes.default';
import routesV1 from './v1/routes.v1';

const apiPostAsyncHandlers = [
  validatePayload,
  setCookie,
  respond,
];

export default function routes(app: Application) {
  app.use(API.DEFAULT, createRouter(routesDefault, [ respond ]));
  app.use(API.V1, createRouter(routesV1, apiPostAsyncHandlers));
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

export interface Route {
  action: (x: object | null) => Promise<ApiResult<any>>;
  beforeware?: Array<(Request: any, res: Response, next: NextFunction) => void>;
  createParam?: (req: Request) => object;
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
}
