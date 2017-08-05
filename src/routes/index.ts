/**
 * ...
 */

import * as express from 'express';
import v1 from './v1'
import { IRouter, NextFunction, Router } from "express-serve-static-core";

let router: Router = express.Router();

router.use("/api/v1", v1);

export default router;