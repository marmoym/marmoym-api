import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import * as DebugService from '@services/debugService';
import HttpMethod from '@constants/HttpMethod';
// import { Route } from '../routes';

const routeMap = [
  {
    action: DebugService.getDebug,
    method: HttpMethod.GET,
    path: ApiURL.DEBUG,
  },
];

export default routeMap;
