/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import * as TermGetController from '../../controllers/Term/TermGetController';
import * as TermAddController from '../../controllers/Term/TermAddController';
import { respond } from '../../services/responseService';

/**
 * Request Mapping: /api/v1/term/
 */
let router: Router = Router();

/**
 * ...
 */
router.route('/')
  /**
   * ...
   */
  .get(async (req: Request, res: Response) => {
    const result = await TermGetController.getTermList(req);
    respond(res, result);
  })

  /**
   * ...
   */
  .post(async (req: Request, res: Response) => {
    respond(res, await TermAddController.addTerm(req));
  })

  /**
   * ...
   */
  .put((req: Request, res: Response) => {
    respond(res, 'Success');
  })


export default router;