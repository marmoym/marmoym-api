import ApiResult from '@models/ApiResult';
import AppError from '@models/AppError';
import { DB1 } from '@modules/Database';
import Definition from '@entities/Definition';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
import { DefinitionRepository } from '@src/repositories/DefinitionRepository';
import { getCustomRepository } from 'typeorm';
// import DefinitionGetResult from '@models/definition/DefinitionGetResult';
import DefinitionAddParam from '@models/definition/DefinitionAddParam';
import { TermRepository } from '@src/repositories/TermRepository';
import Term from '@entities/Term';
import Vote from '@entities/Vote';
import User from '@entities/User';

export async function getDefinitions(param: {
  limit: number,
  offset: number,
}) {
  try {
    const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
    const data = await definitionRepo.find({
      skip: param.offset,
      take: param.limit,
    });
    const result = new ApiResult<Definition>(data);
    return result;
  } catch (err) {
    throw err;
  }  
};

export async function getDefinitionById(param: DefinitionGetParam) {
  try {
    const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
    const data = await definitionRepo.findOne(param.definitionId);
    const result = new ApiResult<Definition>(data);
    return result;
  } catch (err) {
    throw err;
  }
};

export async function addDefinition(param: {
  definition: Definition,
}) {
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
    return new ApiResult<Definition>(data);
  } catch (err) {
    throw err;
  }
};
