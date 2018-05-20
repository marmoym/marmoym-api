import {EntityRepository, Repository} from 'typeorm';
import Vote from '@entities/Vote';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {

}