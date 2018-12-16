import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { MiddlewareDefinition } from '@nodekit/express-middleware-attach';

import { API } from '@@models/ApiURL';
import corsHandler from '@@middlewares/corsHandler';
import errorHandler from '@@middlewares/errorHandler';
import httpLogger from '@@middlewares/httpLogger';
import launchStatusChecker from '@@middlewares/launchStatusChecker';
import routeNoMatchHandler from '@@middlewares/routeNoMatchHandler';
import routers from '@@routes/routers';
import state from '@@models/state';

const middlewareDefinitions: MiddlewareDefinition[] = [
  {
    middlewares: [ 
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json(),
    ],
  },
  {
    middlewares: [ httpLogger ],
  },
  {
    middlewares: [ corsHandler() ],
  },
  {
    middlewares: [ errorHandler ],
  },
  {
    middlewares: [ cookieParser() ],
  },
  {
    middlewares: [ launchStatusChecker(state) ],
  },
  {
    middlewares: [ routers.default ],
    path: API.DEFAULT,
  },
  {
    middlewares: [ routers.v1 ],
    path: API.V1,
  },
  {
    middlewares: [ routeNoMatchHandler ],
  },
  {
    middlewares: [ errorHandler ],
  },
];

export default middlewareDefinitions;
