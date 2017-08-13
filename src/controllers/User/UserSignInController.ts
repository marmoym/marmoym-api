import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import config from '../../config';
import models from '../../models/db';

export const signInUser = async (userInfo) => {
  const User =  models.user;

  return await User
    .findOne({
      where: {
        username: userInfo.username
      }
    })
    .catch(res => {
      throw new Error(`401000, Not found ${userInfo.username}`);
    })
    .then(res => {
      const user = res.dataValues;
      if (bcrypt.compareSync(userInfo.password, user.password)) {
        return jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email
          },
          config.auth.JWT_SECRET,
          {
            expiresIn: config.auth.TOKEN_EXPIRE_DURATION
          }
        );
      } else {
        throw new Error('401001, Incorrect password');
      }
    });
}