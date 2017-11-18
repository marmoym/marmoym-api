/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import db from '../../database';
import respond from '@src/modules/respond';
// import { Definition } from '../../models/ModelTypes';
// import { DefinitionStatus } from '../../models/common/DefinitionStatus';
import * as URL from '@constants/ApiURL';
import * as RequestTypes from '../RequestTypes';
import tokenAuthHandler from '@src/middlewares/tokenAuthHandler';
import * as UserSignUpController from "../../controllers/User/UserSignUpController";
import * as UserSignInController from "../../controllers/User/UserSignInController";
import * as UserUpdateController from "../../controllers/User/UserUpdateController";
import * as UserDeleteController from "../../controllers/User/UserDeleteController";
import * as UserGetController from "../../controllers/User/UserGetController";
import * as UserCheckUsedController from "../../controllers/User/UserCheckUsedController";

function userRoute(router) {
  
  router.route(URL.USERS_NEW)
    /**
     * 회원가입
     */
    .post((request: Request, response: Response) => {
      const req: RequestTypes.SignUpUser = request.body;
      const payload = UserSignUpController.signUpUser(req);
      
      respond(response, payload);
    })
  
  router.route(URL.SESSION_NEW)
    /**
     * 로그인
     */
    .post((request: Request, response: Response) => {
      const req: RequestTypes.SignInUser = request.body;
      const payload = UserSignInController.signInUser(req);
      
      respond(response, payload);
    })

  router.route(URL.USERS_USERID)
    /**
    * 회원정보가져오기
    */
    .get(tokenAuthHandler, (request: Request, response: Response) => {
      const req: RequestTypes.GetUser = request.params;
      const payload = UserGetController.getUserInfo(req);

      respond(response, payload);
    })
    /**
     * 회원정보수정
     */
    .put(tokenAuthHandler, (request: Request, response: Response) => {
      const req: RequestTypes.UpdateUser = request.body;
      const payload = UserUpdateController.updateUser(req);

      respond(response, payload);
    })
    /**
     * 회원정보삭제
     * todo: Task can be handled in `updating user information`.
     */
    // .delete(tokenAuthHandler, (request: Request, response: Response) => {
    //   const req: RequestTypes.DeleteUser = request.body;
    //   const payload = UserDeleteController.deleteUser(req);

    //   respond(response, payload);
    // })

  router.route(URL.USERS)
    /**
    * Username 사용여부 확인
    */
    // .post((request: Request, response: Response) => {
    //   // should be changed to POST
    //   const req: RequestTypes.CheckUsedUser = request.params;
    //   const payload = UserCheckUsedController.checkUsernameUsed(req);

    //   respond(response, payload);
    // })

  router.route(URL.USERS)
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