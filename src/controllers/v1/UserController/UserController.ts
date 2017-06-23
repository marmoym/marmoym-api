/**
 * Copyright Marmoym 2017
 * 
 * Created in Jun 18, 2017
 */

import * as jwt from 'jsonwebtoken'
import models from '../../../models'
import config from '../../../config'

/**
 * ...
 */
class UserController {

  public test(input: String){
    // console.log("hello test"+ input)

    return false;

  }
 
  /**
   * ...
   */
  public getUserInfo(userId: String, userPw: String) {
    models.user.findAll({
      where : {
        username : userId
      }
    }).then(function(user){
      // console.log(1, user.length)
      // console.log(2, user)

    })

    return true;
  }

  /**
   * ...
   */
  public getUserToken(userId: String) {
    console.log(1, 'getuserToken' + userId)
    var token = jwt.sign(
        {
          id : userId
        },
        config.server.jwtKey,
        {
          expiresIn: '7d',
          issuer: 'kweb.korea.ac.kr',
          subject: 'userInfo'
        }
      );
    console.log(3, token)
    return token;

  }

/**
 * ...
 * @param userId 
 * @param userPw 
 */
  public registerUser(userId: String, userPw: String) {
    models.user.create({
      username: 'test1',
      password: 'test1',
      email: "test1"
    })
  }

}

export default new UserController()