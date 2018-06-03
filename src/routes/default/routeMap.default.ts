import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import DebugAction from './DebugAction';
import HttpMethod from '@constants/HttpMethod';

export default [
  {
    action: DebugAction.getDebug,
    method: HttpMethod.GET,
    path: ApiURL.DEBUG,
  },
];
