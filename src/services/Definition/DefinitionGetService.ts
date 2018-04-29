import db from '@database/db';
import * as TermSelectDAO from '@daos/Term/TermSelectDAO';
import * as UserSelectDAO from '@daos/User/UserSelectDAO';
import * as DefinitionSelectDAO from '@daos/Definition/DefinitionSelectDAO';
import * as PosSelectDAO from '@daos/Pos/PosSelectDAO';
import * as UsageSelectDAO from '@daos/Usage/UsageSelectDAO';
import * as OriginSelectDAO from '@daos/Origin/OriginSelectDAO';
import AppError from '@models/AppError';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import DefinitionGetResult from '@models/definition/DefinitionGetResult';

export default class DefinitionGetService {
  public static async getDefinitions(param) {
    try {
      const data = await DefinitionSelectDAO.selectDefinitions(1, 10);
      
      const result = new DefinitionGetResult(data);
      return result;
    } catch (err) {
      // todos
    }  
  }
};

// export async function getDefinitions(param: DefinitionGetParam): Promise<any> {
//   try {
//     const data = await DefinitionSelectDAO.selectDefinitions(1, 10);
    
//     const result = DefinitionGetResult.ofMany(data);
//     return result;
//   } catch (err) {
//     // todos
//   }
// }
// export async function getDefinitionByDefIds(param: GetDefinitionsParam)
//   : Promise<GetDefinitionsResult> {
    
//   let result = new GetDefinitionsResult();

//   let termIds = [];
//   let userIds = [];

//   const defSelected = await DefinitionSelectDAO.selectDefinitionsByIds(param.defIds);
  
//   await Promise.all(defSelected.map(async defObj => {
//     termIds = _appendIfNotPresent(termIds, defObj, 'term_id');
//     userIds = _appendIfNotPresent(userIds, defObj, 'user_id');

//     defObj.updated_at = defObj.updated_at.getTime();
//     defObj.poss = await PosSelectDAO.selectPosByDefinitionId(defObj.id);
//     defObj.usages = await UsageSelectDAO.selectUsageByDefinitionId(defObj.id);
//     defObj.origins = await OriginSelectDAO.selectOriginByDefinitionId(defObj.id);

//     result.definitions.push(defObj);
//   }));

//   const termSelected = await TermSelectDAO.selectTermByIds(termIds);
//   termSelected.map(term => {
//     term.updated_at = term.updated_at.getTime();
//     result.terms.push(term);
//   });

//   result.users = await UserSelectDAO.selectUserByIds(userIds);
//   return result;
// }

// export async function getRecentlyUpdatedDefinitionIds(param: GetDefinitionIdsParam) {
//   const definitionIds = await DefinitionSelectDAO.selectIdsOfRecentlyAdded(param.offset, 10);
//   await Promise.all(definitionIds.map(defObj => {
//     defObj.updated_at = defObj.updated_at.getTime();
//   }));
//   return definitionIds;
// }

// export async function getDefinitionIds(param: GetDefinitionIdsParam) {
//   const definitionIds = await DefinitionSelectDAO.selectIdsByIds(param.defIds);
//   await Promise.all(definitionIds.map(defObj => {
//     defObj.updated_at = defObj.updated_at.getTime();
//   }));
//   return definitionIds;
// }

// export async function getDefinitionIdsBySearch(req) {
//   const definitionIds = await DefinitionSelectDAO.selectIdsByTerm(req.query,0,10);
//   await Promise.all(definitionIds.map(defObj => {
//    defObj.updated_at = defObj.updated_at.getTime();
//   }));
//   return definitionIds;
// }

// function _appendIfNotPresent(arr, elem, key) {
//   if (arr.indexOf(elem[key]) == -1) {
//     arr.push(elem[key]);
//   }
//   return arr;
// }