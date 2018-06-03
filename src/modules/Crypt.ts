import * as bcrypt from 'bcrypt';

/**
 * ...
 */
export default class Crypt {
  static async compare({
    src,
    hash,
  }) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(src, hash, (err, hash) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

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
