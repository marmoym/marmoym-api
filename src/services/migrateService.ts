import { getCustomRepository } from 'typeorm';

import ApiURL from '@models/ApiURL';
import ApiResult from '@models/ApiResult';
import { DB1 } from '@modules/Database';
import { DefinitionRepository } from '@src/repositories/DefinitionRepository';
import User from '@entities/User';
import { UserRepository } from '@src/repositories/UserRepository';
import Definition from '@entities/Definition';
import seedData from '@src/migrate/seed/seed.180725';
import Term from '@entities/Term';
import { TermRepository } from '@src/repositories/TermRepository';
import Vote from '@entities/Vote';
import { VoteRepository } from '@src/repositories/VoteRepository';

export async function seed() {
  const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
  const termRepo = getCustomRepository(TermRepository, DB1);
  const userRepo = getCustomRepository(UserRepository, DB1);
  const voteRepo = getCustomRepository(VoteRepository, DB1);

  const users: User[] = seedData.users.map((user) => new User(user));
  await userRepo.save(users);

  const definitions: Definition[] = seedData.definitions.map((d) => new Definition(d));
  await definitionRepo.save(definitions);

  return new ApiResult({});
};
