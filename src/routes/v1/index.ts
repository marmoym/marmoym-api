/**
 * Copyright Marmoym 2017
 */

import models from '../../models';
import { Router, Request, Response } from 'express';
import termRoute from './termRoute';
import userRoute from './userRoute';

let router: Router = Router();


router.use('/users', userRoute)

router.use('/terms', termRoute)

export default router;