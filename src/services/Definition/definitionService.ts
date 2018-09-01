import { getCustomRepository } from 'typeorm';

import ApiResult from '@models/ApiResult';
import AppError from '@models/AppError';
import { DB1 } from '@modules/Database';
import Definition from '@entities/Definition';
import { DefinitionRepository } from '@src/repositories/DefinitionRepository';
import Term from '@entities/Term';
import { TermRepository } from '@src/repositories/TermRepository';
import Vote from '@entities/Vote';
import User from '@entities/User';

export default {
  async addDefinition({
    definition,
    term,
  }: AddDefinitionParam) {
    try {
      const termRepo = getCustomRepository(TermRepository, DB1);
      const [ _term, count ] = await termRepo.findAndCount({
        label: term,
      });

      const newDefinition = new Definition({
        term: _term[0] || new Term({
          label: term,
        }),
        label: definition,
      });

      console.log(123, newDefinition);

      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      definitionRepo.save(newDefinition);

      return new ApiResult<{}>({});
    } catch (err) {
      throw err;
    }
  },
  async getDefinitionById({
    definitionId,
  }: GetDefinitionByIdParam) {
    try {
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.findOne(definitionId);
      const result = new ApiResult<Definition>(data);
      return result;
    } catch (err) {
      throw err;
    }
  },
  async getDefinitions({
    limit,
    offset,
  }: GetDefinitionsParam) {
    try {
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.find({
        skip: offset,
        take: limit,
      });
      const result = new ApiResult<Definition>(data);
      return result;
    } catch (err) {
      throw err;
    }  
  },
};

export interface AddDefinitionParam {
  definition: string,
  term: string,
};

export interface GetDefinitionsParam {
  limit: number,
  offset: number,  
};

export interface GetDefinitionByIdParam {
  definitionId: number,
};
