import { Router, Request, Response } from 'express'

import asyncWrapper from '@middlewares/asyncWrapper';
import * as ApiURL from '@constants/ApiURL';
import db from '../../database';
import * as DefinitionAddController from '../../controllers/Definition/DefinitionAddController';
import * as DefinitionGetController from '../../controllers/Definition/DefinitionGetController';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import respond from '@src/modules/respond';
import { requireNonNull, optional } from '@src/utils/objectUtils';



function definitionRoute(router) {
  router.route(ApiURL.DEFINITIONS)
    /**
     * /api/v1/definitions
     * Definitions 가져오기
     */
    .post((asyncWrapper(async (req: Request, res: Response) => {

      const param = new DefinitionGetParam({
        page: requireNonNull(req.body.page),
        search: req.body.search
      })

      
      // return new Promise((resolve, reject) => {
      // ));
      return DefinitionGetController.getDefinitions(param);

    })))

  // router.route(ApiURL.DEFINITIONS_NEW)
  //   /**
  //    * Definition 등록
  //    */
  //   .post((request: Request, response: Response) => {
  //     const req = request.body;
  //     const payload = DefinitionAddController.addDefinition(req);

  //     respond(response, payload);
  //   })

  // router.route(ApiURL.DEFINITIONS_IDS)
  //   /**
  //    * 최신 Definitions 가져오기
  //    */
  //   .get((request: Request, response: Response) => {
  //     const param: GetDefinitionIdsParam = request['$param'];
  //     let payload;
  //     if (param.defIds.length) {
  //       payload = DefinitionGetController.getDefinitionIds(param);
  //     } else {
  //       payload = DefinitionGetController.getRecentlyUpdatedDefinitionIds(param);
  //     }
  //     respond(response, payload, 'defIds');
  //   })

//   router.route(ApiURL.SEARCH)
//     /**
//      * Definition 검색
//      */
//     .get((request: Request, response: Response) => {
//       const req = request.query;
//       const payload = DefinitionGetController.getDefinitionIdsBySearch(req);

//       respond(response, payload, 'defIds');
//     })
// }
}

export default definitionRoute;
