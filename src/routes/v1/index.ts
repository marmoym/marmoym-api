import { Router, Request, Response } from 'express';

import definitionRoute from './definitionRoute';
import userRoute from './userRoute';
// import paramValidator from '@src/middlewares/paramValidator/paramValidator';

let router: Router = Router();

// router.use(paramValidator)
definitionRoute(router);
userRoute(router);

export default router;