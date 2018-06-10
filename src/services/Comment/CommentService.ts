import { getTreeRepository } from 'typeorm';

import Comment from '@entities/Comment';
import { DB1 } from '@modules/Database';
import Term from '@entities/Term';
import Vote from '@entities/Vote';
import User from '@entities/User';

export default class CommentService {
  public static async addComment() {
    const commentRepo = getTreeRepository(Comment, DB1);

    const a1 = new Comment();
    a1.targetId = 1;
    a1.targetType = 'a';
    a1.content = "a1";
    await commentRepo.save(a1);

    const a2 = new Comment();
    a2.targetId = 1;
    a2.targetType = 'a';
    a2.parent = a1;
    a2.content = "a2";
    await commentRepo.save(a2);

    const a11 = new Comment();
    a11.targetId = 1;
    a11.targetType = 'a';
    a11.parent = a2;
    a11.content = 'a11';
    await commentRepo.save(a11);

    const a12 = new Comment();
    a12.targetId = 1;
    a12.targetType = 'a';
    a12.parent = a2;
    a12.content = 'a12';
    return await commentRepo.save(a12);
  }

  public static async getComments() {
    const commentRepo = getTreeRepository(Comment, DB1);
    
    const comment = await commentRepo.find({
      where: {
        id: 21,
      },
    });

    const c2 = await commentRepo.findDescendants(comment[0]);

    return await commentRepo
      .createDescendantsQueryBuilder("comment", "", comment[0])
      .getMany();
  }
};
