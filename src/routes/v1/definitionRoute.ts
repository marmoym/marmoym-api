import { Router, Request, Response } from 'express'

import asyncWrapper from '@middlewares/asyncWrapper';
import ApiURL from '@models/ApiURL';
import db from '@database/db';
// import DefinitionAddService from '@services/Definition/DefinitionAddController';
import DefinitionGetService from '@services/Definition/DefinitionGetService';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import { requireNonEmpty, optional } from '@src/utils/objectUtils';

import { getConnection, getRepository } from "typeorm";
import Definition from '@entities/Definition';
import Term from '@entities/Term';
import User from '@entities/User';

function definitionRoute(router) {
  router.route(ApiURL.DEFINITIONS)
    /**
     * /api/v1/definitions
     * Definitions 가져오기
     */
    .post(asyncWrapper(async (req, res) => {
      const term = new Term();
      term.label = '앙 기모띠';
      term.roman = 'ang';
      term.status = 'N';

      const definition = new Definition();
      definition.label = '기분이 좋다2';
      definition.term = term;

      const user = new User();
      user.id = 2;
      definition.user = user;
            
      const definitionRepo = getConnection('db1').getRepository(Definition);

      definitionRepo.save(definition)
        .then((definition) => {
          console.log(123, definition);
        });

      // const param = new DefinitionGetParam({
      //   page: optional(req.body.page).orElse(1),
      //   // page: optional(req.body.page).orElse(1),
      //   search: req.body.search,
      // });
      
      // return DefinitionGetService.getDefinitions(param);
      return "1";
    }));

  router.route(ApiURL.DEFINITIONS_DEFINITIONID)
    .post(asyncWrapper(async (req, res) => {
      const param = new DefinitionGetParam({
        definitionId: requireNonEmpty(req.body.definitionId),
      });

      return DefinitionGetService.getDefinitions(param);
    }));

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
