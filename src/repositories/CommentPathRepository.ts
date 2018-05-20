import {EntityRepository, Repository} from 'typeorm';
import CommentPath from '@entities/CommentPath';

@EntityRepository(CommentPath)
export class CommentPathRepository extends Repository<CommentPath> {
  
}