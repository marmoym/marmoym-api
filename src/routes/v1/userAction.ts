import { Router, Request, Response } from 'express'

import asyncWrapper from '@middlewares/asyncWrapper';
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
    username: requireNonEmpty(req.body.username),
  });

  const result = await UserService.signInUser(param);
  return result; 
};

// export default function userRoute(router) {
//   router.route(ApiURL.USER_NEW)
//     /**
//      * User sign up
//      */
//     .post(asyncWrapper(async (req: Request, res: Response) => {
//       const param = new UserParam({
//         email: requireNonEmpty(req.body.email),
//         password: requireNonEmpty(req.body.password),
//         username: requireNonEmpty(req.body.username),
//       });

//       const result = await UserService.signUpUser(param);
//       return result;
//     }))
  
//   router.route(ApiURL.SESSION_NEW)
//     /**
//      * User sign in
//      */
//     .post(asyncWrapper(async (req: Request, res: Response) => {
//       const param = new UserParam({
//         email: requireNonEmpty(req.body.email),
//         password: requireNonEmpty(req.body.password),
//       });

//       const result = await UserService.signInUser(param);
//       return result; 
//     }))

//   router.route(ApiURL.USERS_$USERID)
//     /**
//     * 회원정보가져오기
//     */
//     // .get(tokenHandler, (request: Request, response: Response) => {
//     // })
//     // /**
//     //  * 회원정보수정
//     //  */
//     // .put(tokenHandler, (request: Request, response: Response) => {
//     // })

//     /**
//      * 회원정보삭제
//      * todo: Task can be handled in `updating user information`.
//      */
//     // .delete(tokenAuthHandler, (request: Request, response: Response) => {
//     //   const req: RequestTypes.DeleteUser = request.body;
//     //   const payload = UserDeleteController.deleteUser(req);

//     //   respond(response, payload);
//     // })

//   // router.route(URL.USERS)
//     /**
//     * Username 사용여부 확인
//     */
//     // .post((request: Request, response: Response) => {
//     //   // should be changed to POST
//     //   const req: RequestTypes.CheckUsedUser = request.params;
//     //   const payload = UserCheckUsedController.checkUsernameUsed(req);

//     //   respond(response, payload);
//     // })

//   // router.route(URL.USERS)
//     /**
//     * Email 사용여부 확인
//     */
//     // .post((request: Request, response: Response) => {
//     //   // will be changed to POST
//     //   const req: RequestTypes.CheckUsedUser = request.params;
//     //   const payload = UserCheckUsedController.checkEmailUsed(req);

//     //   respond(response, payload);
//     // })
// };
