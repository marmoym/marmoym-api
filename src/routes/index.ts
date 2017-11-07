import { Router, Request, Response } from 'express';

import v1 from './v1'

let router: Router = Router();
router.use("/api/v1", v1);

export default router;