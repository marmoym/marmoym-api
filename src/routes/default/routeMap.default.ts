import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import DebugAction from './DebugAction';
import HttpMethod from '@constants/HttpMethod';

const routeMap: RouteIF[] = [
  {
    action: DebugAction.getDebug,
    method: HttpMethod.GET,
    path: ApiURL.DEBUG,
  },
];

export default routeMap;
export interface RouteIF {
  action: Function,
  method: string,
  path: string,
};
