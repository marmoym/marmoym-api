/**
 * Copyright Marmoym 2017
 * 
 * Created in Jun 18, 2017
 */

import * as jwt from 'jsonwebtoken'
import models from '../../../models'
import config from '../../../config'
import * as bcrypt from 'bcrypt'


const saltRounds = 10;
/**
 * ...
 */
class UserController {
 

  /**
   * ...
   */
  public getUserInfo(param: any) {

    return models.user.findOne({
                    where : {
                      username : param.username,
                      status: {$not: "DELETED"}
                    }
                  }).then((user) => {
                      console.log(3, user)
                      return user;
                  })
  }

  /**
   * ...
   */
  public getUserToken(param: any) {

    var token;

    return this.getUserInfo(param).then( (user) => {
      if(user != null){

        if(bcrypt.compareSync(param.pw, user.password)) {
          token = jwt.sign(
                  {
                    id : user.username
                  },
                config.server.jwtKey,
                  {
                    expiresIn: '7d',
                    subject: 'userInfo'
                  }
                );
        }

      }
      return token;

  })

}

/**
   * ...
*/
public verifyUserToken(input_token: string) {
  try {
    var decoded = jwt.verify(input_token, config.server.jwtKey);
  } catch(err) {
    return "Error";
  }
  console.log(1, decoded)
  //TODO 사용자권한 체크
  return "Verify";
}

/**
 * ...
 * @param userId 
 * @param userPw 
 */
  public registerUser(param: any) {
 
    //TODO 중복체크 순서대로 작동후 등록으로넘어가게
    if(!this.checkUsernameExist(param.username)) {
      return "UsernameExist";
    }

    if(!this.checkUserEmailExist(param.email)) {
      return "UserEmailExist";
    }
    
    let encodedPw = bcrypt.hashSync(param.pw, saltRounds);
    console.log(1, encodedPw)
    if(models.user.create({
          username: param.username,
          password: encodedPw,
          email: param.email
        }).then(
          (result) => {
            return true;
          }
        ).catch(
          (err) => {
            return false;
          }
        )
      ){
      return "JoinSuccess";
    }
    return "Error";
  }

  /**
   * ...
   */
  public checkUsernameExist(input: String) {
    //TODO Promise 나 async 적용 
    if(models.user.count({
          where: {
            status: {$not: "DELETED"},
            username: input    
          }
        }).then(
          (result) => {
            if(result == 0){  
              return true;
            }else{
              return false;
            }
          }
        )
        .catch(
          (err) => {
            console.log(err)
            return false;
          }
        )
      ){
      return true;
    }
    return false;
  }

  /**
   * ...
   */
  public checkUserEmailExist(input: String) {
     //TODO Promise 나 async 적용 
    if(models.user.count({
          where: {
            status: {$not: "DELETED"},
            email: input    
          }
        }).then(
          (result) => {
            if(result == 0){
              return true;
            }else{
              return false;
            }
          }
        ).catch(
          (err) => {
            console.log(err)
            return false;
          }
        )
      ){
      return true;
    }
    return false;
  }

  /**
   * ...
   */
  public updateUserInfo(param: any) {

    //TODO 중복체크후 밑에 수정 작동하도록
    if(!this.checkUserEmailExist(param.email)) {
      return "UserEmailExist";
    }

    let encodedPw = bcrypt.hashSync(param.pw, saltRounds);

    if(models.user.update({
          password: encodedPw,
          email: param.email
        },{
          where : {
            username : param.username
          }
        }).then(
          (result) => {
            return true;
          }
        ).catch(
          (err) => {
            return false;
          }
        )
      ){
      return "UpdateSuccess";
    }
    return "Error";
  }

  /**
   * ...
   */
  public deleteUser(param: any) {
    
    if(models.user.update({
        status: 'DELETE'
        },{
          where : {
            username : param.username
          }
        }).then(
          (result) => {
            return true;
          }
        ).catch(
          (err) => {
            return false;
          }
        )
      ){
      return "DeleteSuccess";
    }
    return "Error";
  }

}

export default new UserController()