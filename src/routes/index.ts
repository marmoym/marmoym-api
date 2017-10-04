import * as express from 'express';
import { IRouter, NextFunction, Router } from "express-serve-static-core";

import v1 from './v1'

let router: Router = express.Router();
router.use("/api/v1", v1);

export default router;