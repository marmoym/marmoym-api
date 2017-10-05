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
import * as UserSignUpController from "../../controllers/User/UserSignUpController";
import * as UserSignInController from "../../controllers/User/UserSignInController";

function userRoute(router) {
  
  router.route(URL.USER_ROUTE)
    /**
     * 회원정보가져오기
     */
    .get((request: Request, response: Response) => {
      //TODO
    })
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
    .put((request: Request, response: Response) => {
      //TODO
    })
    /**
     * 회원정보삭제
     */
    .delete((request: Request, response: Response) => {
      //TODO
    })
  
  router.route(URL.USER_SIGNIN_ROUTE)
    /**
     * 로그인
     */
    .post((request: Request, response: Response) => {
      const req: UserRequest.SignIn = request.body;
      const payload = UserSignInController.signInUser(req);
      
      respond(response, payload);
    })

} 

export default userRoute;