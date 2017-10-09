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

export async function getDefinitionByDefIds(req) {
  let result ={};
  result['terms'] = [];
  result['definitions'] = [];
  result['users']= [];

  let termIds = [];
  let userIds = [];

  //get definitions
  const defSelected = await DefinitionSelectDAO.selectDefinitionsByIds(req.defIds)
  await Promise.all(defSelected.map(async defObj => {
    if (termIds.indexOf(defObj.term_id) == -1) {
      termIds.push(defObj.term_id);
    }
    if (userIds.indexOf(defObj.user_id) == -1) {
      userIds.push(defObj.user_id);
    }

    defObj.updatedAt = defObj.updatedAt.getTime();

    //get Pos
    const posSelected = await PosSelectDAO.selectPosByDefinitionId(defObj.id);
    defObj['poss'] = [];
    await Promise.all(posSelected.map(posObj => {
      defObj['poss'].push(posObj);
    }));

    //get usages
    const usageSelected = await UsageSelectDAO.selectUsageByDefinitionId(defObj.id);
    defObj['usages'] = [];
    await Promise.all(usageSelected.map(usageObj => {
      defObj['usages'].push(usageObj);
    }));

    //get origins
    const originSelected = await OriginSelectDAO.selectOriginByDefinitionId(defObj.id);
    defObj['origins'] = [];
    await Promise.all(originSelected.map(originObj => {
      defObj['origins'].push(originObj);
    }));

    result['definitions'].push(defObj);
  }));

  const termSelected = await TermSelectDAO.selectTermByIds(termIds);
  await Promise.all(termSelected.map(termObj => {
    termObj.updatedAt = termObj.updatedAt.getTime();
    result['terms'].push(termObj);
  }));

  const userSelected = await UserSelectDAO.selectUserByIds(termIds);
  await Promise.all(userSelected.map(userObj => {
    result['users'].push(userObj);
  }))

  return result;

};

export async function getRecentlyUpdatedDefinitionIds(req) {
  const definitionIds = await DefinitionSelectDAO.selectRecentlyCreatedDefinitionIds(req.offset, 10);
  await Promise.all(definitionIds.map(defObj => {
    defObj.updatedAt = defObj.updatedAt.getTime();
  }));
  return definitionIds;
};

