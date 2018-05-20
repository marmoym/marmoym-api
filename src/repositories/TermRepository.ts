import {EntityRepository, Repository} from 'typeorm';
import Origin from '@entities/Origin';
import Pos from '@entities/Pos';
import Term from '@entities/Term';

@EntityRepository(Term)
export class TermRepository extends Repository<Term> {

}