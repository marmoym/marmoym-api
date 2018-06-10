import { Request, Response } from 'express';

import CommentService from '@services/Comment/CommentService';
import DummyResult from '@models/DummyResult';

export async function postComment(req: Request, res: Response) {
  const commentId = await CommentService.addComment();
  console.log(123, commentId);
  return new DummyResult({
    status: 'ok',
  });
};

export async function getComments(req: Request, res: Response) {
  const comments = await CommentService.getComments();
  console.log(123, comments);
  return new DummyResult({
    status: 'ok',
  })
};
