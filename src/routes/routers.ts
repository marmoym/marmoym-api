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
import Cookie from '@@models/Cookie';
import { expressLog } from '@@modules/Log';
import HttpStatus from '@@constants/HttpStatus';
import ResponseType from '@@models/ResponseType';
import routesDefault from './default/routes.default';
import routesV1 from './v1/routes.v1';

const apiPostAsyncHandlers = [
  validatePayload,
  setCookie,
  respond,
];

const routers = {
  default: createRouter(routesDefault, [ respond ]),
  v1: createRouter(routesV1, apiPostAsyncHandlers),
};

export default routers;

function validatePayload(req: Request, res: Response, next: NextFunction) {
  return function (apiResponse: ApiResponse<any>) {
    if (apiResponse === undefined) {
      throw ApiError.of({
        responseType: ResponseType.RESPONSE_NOT_PROVIDED,
      });
    }

    if (!(apiResponse instanceof ApiResponse)) {
      throw ApiError.of({
        args: [ ApiResponse ],
        responseType: ResponseType.RESPONSE_TYPE_NOT_API_RESPONSE,
      });
    }

    return apiResponse;
  }
}

function setCookie(req: Request, res: Response, next: NextFunction) {
  return function (ApiResponse: ApiResponse<any>) {
    const cookies = ApiResponse.getCookies();
    if (cookies.length > 0) {
      expressLog.debug('Cookies (%s) are set: %j', cookies.length, cookies);

      ApiResponse.getCookies()
        .map((cookie: Cookie) => {
          res.cookie(cookie.key, cookie.value, {
            httpOnly: true,
            maxAge: cookie.maxAge,
          });
      });
    }
    return ApiResponse;
  }
}

function respond(req: Request, res: Response, next: NextFunction) {
  return function (ApiResponse: ApiResponse<any>) {
    res.status(HttpStatus.SUCCESS)
      .send({
        code: ResponseType.SUCCESS.code,
        payload: ApiResponse,
      });

    return ApiResponse;
  }
}

export interface Route<P> {
  action: (param: P) => Promise<ApiResponse<any>>;
  beforeware?: Array<(Request: any, res: Response, next: NextFunction) => void>;
  createParam?: (req: Request) => P;
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
}
