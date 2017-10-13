import db from '../../database';
import * as TermSelectDAO from '../../dao/Term/TermSelectDAO';
import * as UserSelectDAO from '../../dao/User/UserSelectDAO';
import * as DefinitionSelectDAO from '../../dao/Definition/DefinitionSelectDAO';
import * as PosSelectDAO from '../../dao/Pos/PosSelectDAO';
import * as UsageSelectDAO from '../../dao/Usage/UsageSelectDAO';
import * as OriginSelectDAO from '../../dao/Origin/OriginSelectDAO';
import MarmoymError from '../../models/MarmoymError';
import ErrorType from '../../models/ErrorType';
import { transaction } from '../../database/databaseUtils';
import { DefinitionResponse } from '../../routes/ResponseTypes';
import { DefinitionRequest } from '../../routes/RequestTypes';

export async function getDefinitionByDefIds(req: DefinitionRequest.Get)
  : Promise<DefinitionResponse.Get> {
    
  let result: DefinitionResponse.Get = {
    terms: [],
    definitions: [],
    users: []
  };  

  let termIds = [];
  let userIds = [];

  const defSelected = await DefinitionSelectDAO.selectDefinitionsByIds(req.defIds);
  
  await Promise.all(defSelected.map(async defObj => {
    termIds = _appendIfNotPresent(termIds, defObj, 'term_id');
    termIds = _appendIfNotPresent(userIds, defObj, 'user_id');

    defObj.updatedAt = defObj.updatedAt.getTime();
    defObj.poss = await PosSelectDAO.selectPosByDefinitionId(defObj.id);
    defObj.usages = await UsageSelectDAO.selectUsageByDefinitionId(defObj.id);
    defObj.origins = await OriginSelectDAO.selectOriginByDefinitionId(defObj.id);

    result.definitions.push(defObj);
  }));

  const termSelected = await TermSelectDAO.selectTermByIds(termIds);
  termSelected.map(term => {
    term.updatedAt = term.updatedAt.getTime();
    result.terms.push(term);
  });

  result.users.push(await UserSelectDAO.selectUserByIds(termIds));
  return result;
}

export async function getRecentlyUpdatedDefinitionIds(req: DefinitionRequest.idGet) {
  const definitionIds = await DefinitionSelectDAO.selectIdsOfRecentlyAdded(req.offset, 10);
  await Promise.all(definitionIds.map(defObj => {
    defObj.updatedAt = defObj.updatedAt.getTime();
  }));
  return definitionIds;
}

export async function getDefinitionIdsBySearch(req: DefinitionRequest.Search) {
  const definitionIds = await DefinitionSelectDAO.selectIdsByTerm(req.query,0,10);
  await Promise.all(definitionIds.map(defObj => {
   defObj.updatedAt = defObj.updatedAt.getTime();
  }));

  return definitionIds;
}

function _appendIfNotPresent(arr, elem, key) {
  if (arr.indexOf(elem[key]) == -1) {
    arr.push(elem[key]);
  }
  return arr;
}