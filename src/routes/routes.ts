import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import HttpMethod from '@constants/HttpMethod';
import Logger from '@modules/Logger';
import makeResponse from '@middlewares/makeResponse';
import routeMapDefault from './default/routeMap.default';
import routeMap1 from './v1/routeMap.v1';
import { state } from '@src/app';

export default function (app) {
  const routerDefault: Router = registerRoutes(routeMapDefault);
  const router1: Router = registerRoutes(routeMap1);
  
  app.use(routerDefault);
  app.use('/api/v1', router1);
  return app;
};

function registerRoutes(routeMap) {
  const router: Router = Router();
  routeMap.map((route) => {
    Logger.debug('Route is registered: [%s] %s', route.method, route.path);
    router[route.method](route.path, (req: Request, res: Response, next: Function) => {
      route.action(req, res)
        .then((payload) => makeResponse(payload, res))
        .catch(next);
    });
  });
  return router;
}
