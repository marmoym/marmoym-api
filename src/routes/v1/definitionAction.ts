import { Request, Response } from 'express';

import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import DefinitionService from '@services/Definition/DefinitionService';
import { optional, requireNonEmpty } from '@src/utils/objectUtils';
import DefinitionAddParam from '@models/definition/DefinitionAddParam';

export async function postDefinitions(request: Request, response: Response) {
  const param = new DefinitionGetParam({
    limit: optional(request.body.limit).orElse(10),
    offset: optional(request.body.offset).orElse(0),
    search: request.body.search,
  });
  
  return DefinitionService.getDefinitions(param);
};

export async function postDefinitionsDefinitionid(request: Request, response: Response) {
  const param = new DefinitionGetParam({
    definitionId: requireNonEmpty(request.params.definitionId),
  });
  return DefinitionService.getDefinitionById(param);
};

export async function postDefinitionNew(request: Request, response: Response) {

  console.log(request.body);
  const param = new DefinitionAddParam({
    definition: requireNonEmpty(request.body.definition),
  });
  return DefinitionService.addDefinition(param);
}