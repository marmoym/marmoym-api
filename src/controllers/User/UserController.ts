/**
 * Copyright Marmoym 2017
 */
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import models from '../../models/db';
import config from '../../config';

const saltRounds = 10;

/**
 * ...
 */
export const getUserInfo = async function getUserInfo(params: any) {
  var userInfo = await models.user.findOne({
      where : {
        username : params.username,
        status: {$not: "DELETED"}
      }
    })
    .then((user) => user)
  return userInfo;
}

// /**
//  * ...
//  */
// export const getUserToken = async function getUserToken(params: any) {
//   var token;
//   var userInfo = await getUserInfo(params);
//   if (userInfo != null) {
//     if (bcrypt.compareSync(params.pw, userInfo.password)) {
//       token = jwt.sign(
//         {
//           username : userInfo.username
//         },
//         config.server.jwtKey,
//         {
//           expiresIn: '7d',
//           subject: 'userInfo'
//         }
//       );
//     }
//   }
//   return token;
// }

/**
 * ...
 */
// export const verifyUserToken = async function verifyUserToken(input_token: string, params: any) {
//   try {
//     var decoded = jwt.verify(input_token, config.server.jwtKey);
//   } catch(err) {
//     return "TokenValidError";
//   }

//   if (decoded.username == params.username) { //본인
//     return "Authorized";
//   } else { //본인아님
//     return "NotAuthorized";
//   }
// }

/**
 * ...
 * @param userId 
 * @param userPw 
 */
export const registerUser = async function registerUser(params: any) {
  if (!await checkUsernameExist(params.username)) {
    return "UsernameExist";
  }

  if (!await checkUserEmailExist(params.email)) {
    return "UserEmailExist";
  }

  let encodedPw = bcrypt.hashSync(params.pw, saltRounds);
  if (models.user.create({
    username: params.username,
    password: encodedPw,
    email: params.email
  })
    .then((result) => true)
    .catch(err => false)) {
      return "JoinSuccess";
    }
  return "Error";
}

/**
 * ...
 */
export const checkUsernameExist = async function checkUsernameExist(input: String) {
  var check = await models.user.count({
    where: {
      status: {$not: "DELETED"},
      username: input    
    }
  })
    .then(result => {
      if (result == 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => false);
  
  return check ? true : false;
}

/**
 * ...
 */
export const checkUserEmailExist = async function checkUserEmailExist(input: String) {
  var check = await models.user.count({
    where: {
      status: {$not: "DELETED"},
      email: input    
    }
  })
    .then(result => result == 0 ? true : false)
    .catch(err => false)

  return check ? true : false;
}

/**
 * ...
 */
export const updateUserInfo = async function updateUserInfo(params: any) {
  if (!await checkUserEmailExist(params.email)) {
    return "UserEmailExist";
  }

  let encodedPw = bcrypt.hashSync(params.pw, saltRounds);
  var updateResult = await models.user.update({
    password: encodedPw,
    email: params.email
  }, {
    where : {
      username : params.username
    }
  })
    .then(result => true)
    .catch(err => false)

  return updateResult ? "UpdateSuccess" : "Error";
}

/**
 * ...
 */
export const deleteUser = async function deleteUser(params: any) {
  var deleteResult = await models.user.update({
    status: 'DELETE'
  }, {
    where : {
      username : params.username
    }
  })
    .then(result => true)
    .catch(err => false)

  return deleteResult ? 'DeleteSuccess' : "Error";
}
