import AppError from '@models/AppError';
import { DB1 } from '@modules/Database';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import {DefinitionRepository} from '@src/repositories/DefinitionRepository';
import {getCustomRepository} from 'typeorm';
import DefinitionGetResult from '@models/definition/DefinitionGetResult';
import DefinitionAddParam from '@models/definition/DefinitionAddParam';
import {TermRepository} from '@src/repositories/TermRepository';
import Term from '@entities/Term';
import Vote from '@entities/Vote';
import User from '@entities/User';

export default class DefinitionService {

  public static async getDefinitions(param: DefinitionGetParam) {
    try {
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.find({
        skip: param.offset,
        take: param.limit,
      });
      const result = new DefinitionGetResult(data);
      return result;
    } catch (err) {
      // todos
    }  
  }

  public static async getDefinitionById(param: DefinitionGetParam) {
    try {
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.findOne(param.definitionId);
      const result = new DefinitionGetResult(data);
      return result;
    } catch (err) {
      // todos
    }
  }

  public static async addDefinition(param: DefinitionAddParam) {
    try {
      const termRepo = getCustomRepository(TermRepository, DB1);
      const checkTerm = await termRepo.findAndCount({label: param.definition.term.label});
      if (checkTerm[1] === 0) {
        const term = new Term();
        term.label = param.definition.term.label;
        term.status = 'N';
        const insertedTerm = await termRepo.save(term)
        param.definition.term.id = insertedTerm.id;
      } else {
        param.definition.term.id = checkTerm[0][0].id;
      }

      /// temp user setting
      const user = new User();
      user.id = 1;
      param.definition.user = user;

      const vote = new Vote();
      vote.downVoteCount = 0;
      vote.upVoteCount = 0;
      vote.targetType = 'D';
      vote.status = 'N';

      param.definition.vote = vote;
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.save(param.definition);
      return data;
    } catch (err) {

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