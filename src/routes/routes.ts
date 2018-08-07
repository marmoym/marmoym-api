import { Router, Request, Response, NextFunction } from 'express';

import ApiResult from '@models/ApiResult';
import { API } from '@models/ApiURL';
import AppError from '@models/AppError';
import Cookie from '@models/Cookie';
import Crypt from '@modules/Crypt';
import HttpStatus from '@constants/HttpStatus';
import Logger from '@modules/Logger';
import ResponseType from '@models/ResponseType';
import routeMapDefault from './default/routeMap.default';
import routeMap1 from './v1/routeMap.v1';

export interface Route {
  action: (x: object | null) => Promise<ApiResult<any>>,
  before?: Array<(Request, res: Response, next: NextFunction) => void>,
  createParam?: (req: Request) => object,
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
};

export default function routes(app) {
  registerRouter(app, API.DEFAULT, routeMapDefault);
  registerRouter(app, API.V1, routeMap1);

  return app;
};

function registerRouter(app, path, routeMap: Route[]) {
  const router: Router = Router();

  routeMap.map((route) => {
    Logger.debug('Route is registered: [%s] %s', route.method, route.path);
    router[route.method](
      route.path, 
      [
        ...route.before && route.before || [],
        (req: Request, res: Response, next: NextFunction) => {
          const param = route.createParam ? route.createParam(req) : null;
          route.action(param)
            .then(validatePayload)
            .then(setCookie(res))
            .then(respond(res))
            .catch(next);
        },
      ],
    );
  });
  app.use(path, router);
}

function validatePayload(apiResult: ApiResult<any>) {
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

function setCookie(res: Response) {
  return function (apiResult: ApiResult<any>) {
    const cookies = apiResult.getCookies();
    if (cookies.length > 0) {
      Logger.debug('Cookies (%s) are set: %j', cookies.length, cookies);
      apiResult.getCookies()
        .map((cookie: Cookie) => {
          res.cookie(cookie.key, cookie.value, {
            httpOnly: true,
            maxAge: cookie.maxAge,
          });
      });
    }
    return apiResult;
  };
};

function respond(res: Response) {
  return function (apiResult: ApiResult<any>) {
    res.status(HttpStatus.SUCCESS)
      .send({
        code: ResponseType.SUCCESS.code,
        payload: apiResult,
      });
  };
}
