import ApiURL from '@models/ApiURL';
import asyncWrapper from '@middlewares/asyncWrapper';

import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import {optional, requireNonEmpty} from '@src/utils/objectUtils';
import DefinitionGetService from '@services/Definition/DefinitionGetService';

function definitionRoute(router) {
  router.route(ApiURL.DEFINITIONS)
    .post(asyncWrapper(async (req, res) => {

      const param = new DefinitionGetParam({
        limit: optional(req.body.limit).orElse(10),
        offset: optional(req.body.offset).orElse(0),
        search: req.body.search,
      });
      
      return DefinitionGetService.getDefinitions(param);
    }));
    
  router.route(ApiURL.DEFINITIONS_$DEFINITIONID)
    .post(asyncWrapper(async (req, res) => {
      const param = new DefinitionGetParam({
        definitionId: requireNonEmpty(req.params.definitionId),
      });
      console.log(param.definitionId);
      return DefinitionGetService.getDefinitionById(param);

    }));
}

export default definitionRoute;
