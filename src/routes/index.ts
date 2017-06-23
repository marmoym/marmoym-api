/**
 * ...
 */

import * as express from 'express';
import v1 from './v1'
import { IRouter, NextFunction, Router } from "express-serve-static-core";
import models from '../models'

let router: Router = express.Router();

router.use("/api/v1", v1);

export default router;