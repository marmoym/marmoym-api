import { Router, Request, Response } from 'express';

import RouterBase from '@routes/RouterBase';
import definitionRoute from './definitionRoute';

export default class RouterV1 {
  public static routes() {
    let router: Router = Router();
    definitionRoute(router);    

    return router;
  }
};
