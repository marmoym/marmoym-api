import { Request, Response } from 'express';

import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import DefinitionService from '@services/Definition/DefinitionService';
import { optional, requireNonEmpty } from '@src/utils/objectUtils';
import DefinitionAddParam from '@models/definition/DefinitionAddParam';

export async function postDefinitions(req: Request, res: Response) {
  const param = new DefinitionGetParam({
    limit: optional(req.body.limit).orElse(10),
    offset: optional(req.body.offset).orElse(0),
    search: req.body.search,
  });
  
  return DefinitionService.getDefinitions(param);
};

export async function postDefinitionsDefinitionid(req: Request, res: Response) {
  const param = new DefinitionGetParam({
    definitionId: requireNonEmpty(req.params.definitionId),
  });
  return DefinitionService.getDefinitionById(param);
};

export async function postDefinitionNew(req: Request, res: Response) {

  console.log(req.body);
  const param = new DefinitionAddParam({
    definition: requireNonEmpty(req.body.definition),
  });
  return DefinitionService.addDefinition(param);
}