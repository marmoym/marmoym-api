import AppError from '@models/AppError';
import { DB1 } from '@modules/Database';
import {DefinitionRepository} from '@repos/DefinitionRepository';
import {getCustomRepository} from 'typeorm';
import {VoteInstanceRepository} from '@repos/VoteInstanceRepository';
import VoteInstance from '@entities/VoteInstance';
import {VoteRepository} from '@repos/VoteRepository';
import Vote from '@entities/Vote';
import User from '@entities/User';

export default class VoteService {

  // public static async upVote(param: VoteParam) {
  //   try {
  //     let vote = new Vote();
  //     if (param.targetType === 'D') {
  //       const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
  //       const data = await definitionRepo.findOne(param.targetId);
  //       vote = data.vote;
  //     } else if (param.targetType === 'C') {

  //     }
  //     console.log(vote);
  //     const voteInstanceRepo = getCustomRepository(VoteInstanceRepository, DB1);
  //     const voteInstance = new VoteInstance();
  //     voteInstance.action = 'U';
  //     voteInstance.vote = vote;
  //     voteInstance.status = 'N';
  //     const user = new User();
  //     user.id = param.userId;

  //     voteInstance.user = user;

  //     await voteInstanceRepo.save(voteInstance);
  //     const voteRepo = getCustomRepository(VoteRepository, DB1);
  //     vote.upVoteCount++;
  //     const updatedVote = await voteRepo.save(vote);
  //     const result = new VoteResult(updatedVote);
  //     return result;
  //   } catch (err) {
  //     throw(err);
  //   }  
  // }

  // public static async downVote(param: VoteParam) {
  //   try {
  //     let vote = new Vote();
  //     if (param.targetType === 'D') {
  //       const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
  //       const data = await definitionRepo.findOne(param.targetId);
  //       vote = data.vote;
  //     } else if (param.targetType === 'C') {

  //     }
  //     console.log(vote);
  //     const voteInstanceRepo = getCustomRepository(VoteInstanceRepository, DB1);
  //     const voteInstance = new VoteInstance();
  //     voteInstance.action = 'D';
  //     voteInstance.vote = vote;
  //     voteInstance.status = 'N';
  //     const user = new User();
  //     user.id = param.userId;

  //     voteInstance.user = user;

  //     await voteInstanceRepo.save(voteInstance);
  //     const voteRepo = getCustomRepository(VoteRepository, DB1);
  //     vote.downVoteCount++;
  //     const updatedVote = await voteRepo.save(vote);
  //     const result = new VoteResult(updatedVote);
  //     return result;
  //   } catch (err) {
  //     throw(err);
  //   }
  // }
};