import { 
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import { createRouter } from '@nodekit/express-route-mapper';

import { API } from '@@models/ApiURL';
import ApiError from '@@models/ApiError';
import ApiResponse from '@@models/ApiResponse';
import ApiResult from '@@models/ApiResult';
import Cookie from '@@models/Cookie';
import { expressLog } from '@@modules/Log';
import HttpStatus from '@@constants/HttpStatus';
import ResponseType from '@@models/ResponseType';
import routesDefault from './default/routes.default';
import routesV1 from './v1/routes.v1';

const postAsyncHandlers = [
  validatePayload,
  setCookie,
  respond,
];

const routers = {
  default: createRouter(routesDefault, [ respond ]),
  v1: createRouter(routesV1, postAsyncHandlers),
};

export default routers;

function validatePayload(req: Request, res: Response, next: NextFunction) {
  return function (apiResult: ApiResult<any>) {
    if (apiResult === undefined) {
      throw ApiError.of({
        responseType: ResponseType.RESPONSE_NOT_PROVIDED,
      });
    }

    if (!(apiResult instanceof ApiResult)) {
      throw ApiError.of({
        args: [ apiResult ],
        responseType: ResponseType.RESPONSE_TYPE_NOT_API_RESPONSE,
      });
    }

    return apiResult;
  }
}

function setCookie(req: Request, res: Response, next: NextFunction) {
  return function (ApiResult: ApiResult<any>) {
    const cookies = ApiResult.getCookies();
    if (cookies.length > 0) {
      expressLog.debug('Cookies (%s) are set: %j', cookies.length, cookies);

      ApiResult.getCookies()
        .map((cookie: Cookie) => {
          res.cookie(cookie.key, cookie.value, {
            httpOnly: true,
            maxAge: cookie.maxAge,
          });
      });
    }
    return ApiResult;
  }
}

function respond(req: Request, res: Response, next: NextFunction) {
  return function (ApiResult: ApiResult<any>) {
    res.status(HttpStatus.SUCCESS)
      .send(new ApiResponse(
        ResponseType.SUCCESS.code,
        ApiResult.payload,
      ));

    return ApiResult;
  }
}

export interface Route<P> {
  action: (param: P) => Promise<ApiResult<any>>;
  beforeware?: Array<(Request: any, res: Response, next: NextFunction) => void>;
  createParam?: (req: Request) => P;
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
}
