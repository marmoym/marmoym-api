import * as bcrypt from 'bcrypt';

/**
 * ...
 */
export default class Crypt {
  static hash({
    data,
    hashSalt,
  }) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, hashSalt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });  
    });
  }
};
