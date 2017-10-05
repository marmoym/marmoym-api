/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express';
import definitionRoute from './definitionRoute';
import userRoute from './userRoute';
// import termRoute from './termRoute';
// import testRoute from './testRoute';

let router: Router = Router();

definitionRoute(router);
userRoute(router);
// router.use('/users', userRoute);
// router.use('/terms', termRoute);
// router.use('/test', testRoute);
// router.get('/definitions', (req, res) => {
//   res.send('pp')
// })
// rouc

export default router;