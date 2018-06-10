import {
  EntityRepository, 
  Repository,
  TreeRepository,
} from 'typeorm';
import Comment from '@entities/Comment';

@EntityRepository(Comment)
export class CommentRepository extends TreeRepository<Comment> {

}