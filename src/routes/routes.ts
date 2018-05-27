import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import HttpMethod from '@constants/HttpMethod';
import Logger from '@modules/Logger';
import makeResponse from '@middlewares/makeResponse';
import routeMap1 from './v1/routeMap';
import { state } from '@src/app';

export default function (app) {
  const router0: Router = registerDefaultRoutes();
  const router1: Router = registerRoutes(routeMap1);
  
  app.use(router0);
  app.use('/api/v1', router1);
  return app;
};

function registerRoutes(routeMap) {
  const router: Router = Router();
  routeMap.map((route) => {
    Logger.debug('Route is registered: [%s] %s', route.method, route.path);
    router[route.method](route.path, (request: Request, response: Response, next: Function) => {
      route.action(request, response)
        .then((payload) => makeResponse(payload, response))
        .catch(next);
    });
  });
  return router;
}

const registerDefaultRoutes = () => {
  const router: Router = Router();
  router.route(ApiURL.DEBUG)
    .get((request, response) => {
      response.send({
        state,
      });
    });
  return router;
};
