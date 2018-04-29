import { Router, Request, Response } from 'express';

import RouterBase from '@routes/RouterBase';
import definitionRoute from './definitionRoute';
import userRoute from './userRoute';

export default class RouterV1 {
  public static routes() {
    let router: Router = Router();
    
    definitionRoute(router);
    userRoute(router);


    return router;
  }
};
