import {EntityRepository, Repository} from 'typeorm';
import Usage from '@entities/Usage';

@EntityRepository(Usage)
export class UsageRepository extends Repository<Usage> {

}