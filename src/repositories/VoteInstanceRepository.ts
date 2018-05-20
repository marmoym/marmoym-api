import {EntityRepository, Repository} from 'typeorm';
import VoteInstance from '@entities/VoteInstance';

@EntityRepository(VoteInstance)
export class VoteInstanceRepository extends Repository<VoteInstance> {

}