import { getConnection, getRepository } from "typeorm";
import { Router, Request, Response } from 'express'

import ApiURL from '@models/ApiURL';
import asyncWrapper from '@middlewares/asyncWrapper';
import db, { DB1 } from '@database/db';
import Definition from '@entities/Definition';
import Pos from "@database/entities/Pos";
// import DefinitionAddService from '@services/Definition/DefinitionAddController';
// import DefinitionGetService from '@services/Definition/DefinitionGetService';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import { requireNonEmpty, optional } from '@src/utils/objectUtils';
import Term from '@entities/Term';
import Usage from '@entities/Usage';
import User from '@entities/User';
import Comment from '@entities/Comment';

function definitionRoute(router) {
  router.route(ApiURL.DEFINITIONS)
    .post(asyncWrapper(async (req, res) => {
      const term = new Term();
      term.label = '앙 기모띠';
      term.roman = 'ang';
      term.status = 'N';

      const user = new User();
      user.id = 1;

      const usage = new Usage();
      usage.label = 'usage22';
      
      const pos = new Pos();
      pos.label = 'label';
      pos.labelEn = 'labelEn';

      const definition = new Definition();
      definition.label = '기분이 좋다2';
      definition.term = term;
      definition.user = user;
      definition.pos = [ pos ];
      definition.usage = [ usage ];
      const comment = new Comment();
      comment.parentId


      const definitionRepo = getConnection(DB1).getRepository(Definition);

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
    
  router.route(ApiURL.DEFINITIONS_$DEFINITIONID)
    .post(asyncWrapper(async (req, res) => {
      
      const definitionRepo = getConnection(DB1).getRepository(Definition);
      const def = await definitionRepo.find();
      def.map((d) => {
        console.log(123, d);
        console.log(123, d.usage);
      });
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
