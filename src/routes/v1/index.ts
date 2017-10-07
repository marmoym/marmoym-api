/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express';
import definitionRoute from './definitionRoute';
import userRoute from './userRoute';
import termRoute from './termRoute';

let router: Router = Router();

termRoute(router);
definitionRoute(router);
userRoute(router);


export default router;