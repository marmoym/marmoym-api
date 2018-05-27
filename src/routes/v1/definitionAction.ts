import { Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import asyncWrapper from '@middlewares/asyncWrapper';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import DefinitionGetService from '@services/Definition/DefinitionGetService';
import { optional, requireNonEmpty } from '@src/utils/objectUtils';

export async function postDefinitions(request: Request, response: Response) {
  const param = new DefinitionGetParam({
    limit: optional(request.body.limit).orElse(10),
    offset: optional(request.body.offset).orElse(0),
    search: request.body.search,
  });
  
  return DefinitionGetService.getDefinitions(param);
};

export async function postDefinitionsDefinitionid(request: Request, response: Response) {
  const param = new DefinitionGetParam({
    definitionId: requireNonEmpty(request.params.definitionId),
  });
  return DefinitionGetService.getDefinitionById(param);
};
