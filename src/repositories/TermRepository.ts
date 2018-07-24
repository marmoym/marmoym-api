import { EntityRepository, Repository } from 'typeorm';
import Term from '@entities/Term';

@EntityRepository(Term)
export class TermRepository extends Repository<Term> {

}