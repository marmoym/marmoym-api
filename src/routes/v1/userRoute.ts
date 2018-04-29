/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import asyncWrapper from '@middlewares/asyncWrapper';
import db from '@database/db';
import ApiURL from '@models/ApiURL';
import { requireNonEmpty } from '@utils/objectUtils';
import tokenHandler from '@src/middlewares/tokenHandler';
import UserService from '@services/user/UserService';
import UserSignInParam from '@models/user/UserSignInParam';

function userRoute(router) {
  
  router.route(ApiURL.USERS_NEW)
    /**
     * 회원가입
     */
    .post(asyncWrapper(async (req: Request, res: Response) => {
      // const param: SignUpUserParam = req[Constant.VALIDATED_PARAM];
      // const payload = await UserSignUpController.signUpUser(param);
      // return payload;
    }))
  
  router.route(ApiURL.SESSION_NEW)
    /**
     * 로그인
     */
    .post(asyncWrapper(async (req: Request, res: Response) => {
      const param = new UserSignInParam({
        email: requireNonEmpty(req.body.email),
        password: requireNonEmpty(req.body.password),
      });

      const result = await UserService.signInUser(param);
      return result; 
    }))

  router.route(ApiURL.USERS_USERID)
    /**
    * 회원정보가져오기
    */
    // .get(tokenHandler, (request: Request, response: Response) => {
    // })
    // /**
    //  * 회원정보수정
    //  */
    // .put(tokenHandler, (request: Request, response: Response) => {
    // })

    /**
     * 회원정보삭제
     * todo: Task can be handled in `updating user information`.
     */
    // .delete(tokenAuthHandler, (request: Request, response: Response) => {
    //   const req: RequestTypes.DeleteUser = request.body;
    //   const payload = UserDeleteController.deleteUser(req);

    //   respond(response, payload);
    // })

  // router.route(URL.USERS)
    /**
    * Username 사용여부 확인
    */
    // .post((request: Request, response: Response) => {
    //   // should be changed to POST
    //   const req: RequestTypes.CheckUsedUser = request.params;
    //   const payload = UserCheckUsedController.checkUsernameUsed(req);

    //   respond(response, payload);
    // })

  // router.route(URL.USERS)
    /**
    * Email 사용여부 확인
    */
    // .post((request: Request, response: Response) => {
    //   // will be changed to POST
    //   const req: RequestTypes.CheckUsedUser = request.params;
    //   const payload = UserCheckUsedController.checkEmailUsed(req);

    //   respond(response, payload);
    // })
} 

export default userRoute;