import { Router, Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import { requireNonEmpty } from '@utils/objectUtils';
import tokenHandler from '@src/middlewares/tokenHandler';
import UserService from '@services/user/UserService';
import UserParam from '@models/user/UserParam';

export async function postUserNew(req: Request, res: Response) {
  const param = new UserParam({
    email: requireNonEmpty(req.body.email),
    username: requireNonEmpty(req.body.username),
    password: requireNonEmpty(req.body.password),
  });

  const result = await UserService.signUpUser(param);
  return result;
};

export async function postSessionNew(req: Request, res: Response) {
  const param = new UserParam({
    email: requireNonEmpty(req.body.email),
    password: requireNonEmpty(req.body.password),
  });

  const result = await UserService.signInUser(param);
  return result; 
};
