import {EntityRepository, Repository} from 'typeorm';
import Definition from '@entities/Definition';

@EntityRepository(Definition)
export class DefinitionRepository extends Repository<Definition> {

}

