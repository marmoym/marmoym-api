import { Request, Response } from 'express';

import { optional, requireNonEmpty } from '@src/utils/objectUtils';
import VoteParam from '@models/vote/voteParam';
import VoteService from '@services/vote/VoteService';

export async function upVote(request: Request, response: Response) {
  console.log("INN");
  const param = new VoteParam({
    targetId: requireNonEmpty(request.body.targetId),
    targetType: requireNonEmpty(request.body.targetType),
    userId: request.body.userId,
  });

  return VoteService.upVote(param);
};

export async function downVote(request: Request, response: Response) {
  const param = new VoteParam({
    targetId: requireNonEmpty(request.body.targetId),
    targetType: requireNonEmpty(request.body.targetType),
    userId: request.body.userId,
  });
  return VoteService.downVote(param);
};