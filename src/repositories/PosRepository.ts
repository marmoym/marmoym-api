import {EntityRepository, Repository} from 'typeorm';
import Origin from '@entities/Origin';
import Pos from '@entities/Pos';

@EntityRepository(Pos)
export class PosRepository extends Repository<Pos> {

}