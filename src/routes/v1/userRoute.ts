/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response, NextFunction } from 'express'

import { respond } from '../../services/responseService';
import { tokenAuthHandler } from '../../services/authService';
import UserUpdateController from '../../controllers/User/UserUpdateController';
import * as UserSignUpController from '../../controllers/User/UserSignUpController';
import * as UserSignInController from '../../controllers/User/UserSignInController';
import * as UserDeleteController from '../../controllers/User/UserDeleteController';

/**
 * Request Mapping: /api/v1/user/
 */
let router: Router = Router();

/**
 * Deprecated
 */
// router.get('/check_username_exist', async (req: Request, res: Response) => {
//   var result = await UserController.checkUsernameExist(req.params.username);
//   if (result) {
//     res.status(200).json({
//       message: 'User Exist'
//     });
//   } else {
//     res.status(404).json({
//       code: 0, 
//       message: 'User Not Exist'
//     });
//   }
// });

/**
 * Deprecated
 */
// router.get('/check_useremail_exist', async (req: Request, res: Response) => {
//   var result = await UserController.checkUserEmailExist(req.params.useremail);
//   if (result) {
//     res.status(200).json({
//       message: 'UserEmail Exist'
//     });
//   } else {
//     res.status(404).json({
//       code: 0, 
//       message: 'UserEmail Not Exist'
//     });
//   }
// });

/**
 * ...
 */
router.post('/signin', async (req: Request, res: Response) => {
  const a = UserSignInController.signInUser(req.body)
  respond(res, a);
});

/**
 * ...
 */
router.post('/signup', async (req: Request, res: Response) => {
  respond(res, await UserSignUpController.signUpUser(
    req.body.username,
    req.body.password,
    req.body.email));
});

/**
 * ...
 */
router.put('/update', tokenAuthHandler, async (req: Request, res: Response) => {
  respond(res, await UserUpdateController.updateUserInfo(req.body));
});

/**
 * ...
 */
router.delete('/delete', tokenAuthHandler, async (req: Request, res: Response) => {
  // todo
  respond(res, await UserDeleteController.deleteUser(req.body));
});

export default router;