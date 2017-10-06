/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import db from '../../database';
import { respond } from '../../services/responseService';
import * as URL from '../URL';
import { DefinitionRequest } from '../RequestTypes';
import * as DefinitionAddController from '../../controllers/Definition/DefinitionAddController';


function definitionRoute(router) {
  router.route(URL.DEFINITION)
    //TODO
    // .get((req: Request, res: Response) => {
    //   db.transaction((trx) => {
    //     Promise.all([
    //       DefinitionGetDAO.getDefinitions()])
    //       .then(vals => {
    //         const definitions: Definition[] = vals[0];
    //         trx.commit();
    //         respond(res, definitions);
    //       })
    //   });
    // })

    .post((request: Request, response: Response) => {
      const req: DefinitionRequest.Add = request.body;

      const payload = DefinitionAddController.addDefinition(req);
      respond(response, payload);
    })
  
  //TODO
  // router.route(URL.DEFINIITON_TERMID_ROUTE)
  //   .get((req: Request, res: Response) => {
  //     const payload = req.params;
  //     db.transaction((trx) => {
  //       Promise.all([
  //         DefinitionGetDAO.getDefinitionsByTermId(payload.termId)
  //       ]).then(vals => {
  //         const definitions: Definition[] = vals[0];
  //         trx.commit();
  //         respond(res, definitions);
  //       })  
  //     })
  //   })

}

export default definitionRoute;