/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express';
import termRoute from './termRoute';
import userRoute from './userRoute';
import testRoute from './testRoute';

let router: Router = Router();

router.use('/users', userRoute);
router.use('/terms', termRoute);
router.use('/test', testRoute);

export default router;