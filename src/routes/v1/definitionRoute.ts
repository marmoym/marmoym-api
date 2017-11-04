import { Router, Request, Response } from 'express'

import db from '../../database';
import { respond } from '../../services/responseService';
import * as URL from '../URL';
import * as RequestTypes from '../RequestTypes';
import { DefinitionResponse } from '../ResponseTypes';
import * as DefinitionAddController from '../../controllers/Definition/DefinitionAddController';
import * as DefinitionGetController from '../../controllers/Definition/DefinitionGetController';

function definitionRoute(router) {

  router.route(URL.DEFINITIONS)
    /**
     * Definitions 가져오기
     */
    .post((request: Request, response: Response) => {
      const req: RequestTypes.GetDefinitions = request.body;
      req.offset = request.query.offset;
      const payload = DefinitionGetController.getDefinitionByDefIds(req);

      respond(response, payload);
    })
    
  router.route(URL.NEW_DEFINITIONS)
    /**
     * Definition 등록
     */
    .post((request: Request, response: Response) => {
      const req: RequestTypes.NewDefinitions = request.body;
      const payload = DefinitionAddController.addDefinition(req);

      respond(response, payload);
    })

  router.route(URL.DEFINITIONS_IDS)
    /**
     * 최신 Definitions 가져오기
     */
    .get((request: Request, response: Response) => {
      let req: RequestTypes.GetDefinitions = request.query;
      const payload: Promise<DefinitionResponse.idGet> 
        = DefinitionGetController.getRecentlyUpdatedDefinitionIds(req);
      
      respond(response, payload, 'defIds');
    })


  router.route(URL.SEARCH)
    /**
     * Definition 검색
     */
    .get((request: Request, response: Response) => {
      const req: RequestTypes.Search = request.query;
      const payload = DefinitionGetController.getDefinitionIdsBySearch(req);

      respond(response, payload, 'defIds');
    })
}

export default definitionRoute;
