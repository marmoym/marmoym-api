/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import db from '../../database';
import * as URL from '../URL';
import * as TermGetController from '../../controllers/Term/TermGetController';
import { respond } from '../../services/responseService';
import { TermRequest } from '../RequestTypes';

function termRoute(router) {
  
  router.route(URL.TERM_LIST)
    /**
     * Term 리스팅 최신순
     */
    .get((request: Request, response: Response) => {
      const req: TermRequest.Get = request.query;
      const payload = TermGetController.getTerms(req);
      
      respond(response, payload);
    })
    
} 

export default termRoute;