/**
 * Copyright Marmoym 2017
 */
import { Router, Request, Response } from 'express'

import db from '../../database';
import { respond } from '../../services/responseService';
// import { Definition } from '../../models/ModelTypes';
// import { DefinitionStatus } from '../../models/common/DefinitionStatus';
import * as URL from '../URL';
import { UserRequest } from '../RequestTypes';
import { tokenAuthHandler } from '../../services/authService';
import * as UserSignUpController from "../../controllers/User/UserSignUpController";
import * as UserSignInController from "../../controllers/User/UserSignInController";
import * as UserUpdateController from "../../controllers/User/UserUpdateController";
import * as UserDeleteController from "../../controllers/User/UserDeleteController";
import * as UserGetController from "../../controllers/User/UserGetController";
import * as UserCheckUsedController from "../../controllers/User/UserCheckUsedController";

function userRoute(router) {
  
  router.route(URL.USER)
    /**
     * 회원가입
     */
    .post((request: Request, response: Response) => {
      const req: UserRequest.SignUp = request.body;
      const payload = UserSignUpController.signUpUser(req);
      
      respond(response, payload);
    })
    /**
     * 회원정보수정
     */
    .put(tokenAuthHandler, (request: Request, response: Response) => {
      const req: UserRequest.Update = request.body;
      const payload = UserUpdateController.updateUser(req);

      respond(response, payload);
    })
    /**
     * 회원정보삭제
     */
    .delete(tokenAuthHandler, (request: Request, response: Response) => {
      const req: UserRequest.Delete = request.body;
      const payload = UserDeleteController.deleteUser(req);

      respond(response, payload);
    })
  
  router.route(URL.USER_SIGNIN)
    /**
     * 로그인
     */
    .post((request: Request, response: Response) => {
      const req: UserRequest.SignIn = request.body;
      const payload = UserSignInController.signInUser(req);
      
      respond(response, payload);
    })

  router.route(URL.USER_USERID)
    /**
    * 회원정보가져오기
    */
    .get(tokenAuthHandler, (request: Request, response: Response) => {
      const req: UserRequest.Get = request.params;
      const payload = UserGetController.getUserInfo(req);

      respond(response, payload);
    })

  router.route(URL.USER_CHECK_USERNAME_USED)
    /**
    * Username 사용여부 확인
    */
    .get((request: Request, response: Response) => {
      const req: UserRequest.CheckUsed = request.params;
      const payload = UserCheckUsedController.checkUsernameUsed(req);

      respond(response, payload);
    })

  router.route(URL.USER_CHECK_EMAIL_USED)
    /**
    * Email 사용여부 확인
    */
    .get((request: Request, response: Response) => {
      const req: UserRequest.CheckUsed = request.params;
      const payload = UserCheckUsedController.checkEmailUsed(req);

      respond(response, payload);
    })
} 

export default userRoute;