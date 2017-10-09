/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express';
import definitionRoute from './definitionRoute';
import userRoute from './userRoute';

let router: Router = Router();

definitionRoute(router);
userRoute(router);


export default router;