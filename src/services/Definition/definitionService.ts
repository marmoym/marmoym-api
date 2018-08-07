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
    definitionLabel,
    termLabel,
  }: AddDefinitionParam) {
    try {
      const termRepo = getCustomRepository(TermRepository, DB1);
      const [ term, count ] = await termRepo.findAndCount({
        label: termLabel,
      });

      // const definition = new Definition({

      // });

      if (count > 0) {

      }
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
  definitionLabel: string,
  termLabel: string,
};

export interface GetDefinitionsParam {
  limit: number,
  offset: number,  
};

export interface GetDefinitionByIdParam {
  definitionId: number,
};
