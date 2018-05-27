import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import * as AdminAction from './adminAction';
import * as DefinitionAction from './definitionAction';
import HttpMethod from '@constants/HttpMethod';

export default [
  {
    action: DefinitionAction.postDefinitions,
    method: HttpMethod.POST,
    path: ApiURL.DEFINITIONS,
  },
  {
    action: DefinitionAction.postDefinitions,
    method: HttpMethod.POST,
    path: ApiURL.DEFINITION_NEW,
  },
  {
    action: AdminAction.postAdminSeed,
    method: HttpMethod.GET,
    path: ApiURL.ADMIN_SEED,
  },
];
