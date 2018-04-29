import { Router, Request, Response } from 'express';

import RouterV1 from './v1/Router.v1';
import RouterBase from './RouterBase';

export default class AppRouter extends RouterBase {
  public static routes() {
    let router: Router = Router();
    
    router.use("/api/v1", RouterV1.routes());

    // debugRoutes(router);
    // router.use(ApiURL.API_V1_1, RouterV1_1.routes());

    return router;
  }
};