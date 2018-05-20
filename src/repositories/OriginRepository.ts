import {EntityRepository, Repository} from 'typeorm';
import Origin from '@entities/Origin';

@EntityRepository(Origin)
export class OriginRepository extends Repository<Origin> {

}