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
export async function getUserInfo(params: any) {
  var userInfo = await models.user.findOne({
                  where : {
                    username : params.username,
                    status: {$not: "DELETED"}
                  }
                }).then((user) => {
                    console.log(3, user)
                    return user;
                })
  return userInfo
}


/**
 * ...
 */
export async function getUserToken(params: any) {
  var token;

  var userInfo = await getUserInfo(params);

  if(userInfo != null){

    if(bcrypt.compareSync(params.pw, userInfo.password)) {
      token = jwt.sign(
                {
                  username : userInfo.username
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
}


/**
   * ...
*/
export async function verifyUserToken(input_token: string, params: any) {
  
  try {
    var decoded = jwt.verify(input_token, config.server.jwtKey);
  } catch(err) {
    return "TokenValidError";
  }

  if(decoded.username == params.username){ //본인
    return "Authorized"
  }else{ //본인아님
    return "NotAuthorized"
  }

}

/**
 * ...
 * @param userId 
 * @param userPw 
 */
export async function registerUser(params: any) {
 
  if(!await checkUsernameExist(params.username)) {
    return "UsernameExist";
  }

  if(!await checkUserEmailExist(params.email)) {
    return "UserEmailExist";
  }
  let encodedPw = bcrypt.hashSync(params.pw, saltRounds);
  console.log(1, encodedPw)
  if(models.user.create({
        username: params.username,
        password: encodedPw,
        email: params.email
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
export async function checkUsernameExist(input: String) {

  var check = await models.user.count({
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

  if(check){
    return true;
  }
  return false;
}

/**
 * ...
 */
export async function checkUserEmailExist(input: String) {

  var check = await models.user.count({
        where: {
          status: {$not: "DELETED"},
          email: input    
        }
      }).then(
        (result) => {
          if(result == 0){
            console.log(1, 'result not 0')
            return true;
          }else{
            console.log(1, 'result 0')
            return false;
          }
        }
      ).catch(
        (err) => {
          console.log(err)
          return false;
        }
      )

  if(check){
    return true;
  }
  return false;
}

/**
 * ...
 */
export async function updateUserInfo(params: any) {
  
  if(!await checkUserEmailExist(params.email)) {
    return "UserEmailExist";
  }

  let encodedPw = bcrypt.hashSync(params.pw, saltRounds);
  var updateResult = await models.user.update({
                                password: encodedPw,
                                email: params.email
                              },{
                                where : {
                                  username : params.username
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
  if(updateResult){
    return "UpdateSuccess";
  }
  return "Error";
}

/**
 * ...
 */
export async function deleteUser(params: any) {
  var deleteResult = await models.user.update({
                                status: 'DELETE'
                                },{
                                  where : {
                                    username : params.username
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
  if(deleteResult){
    return "DeleteSuccess";
  }
  return "Error";
}
