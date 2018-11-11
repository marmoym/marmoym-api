import * as bcrypt from 'bcrypt';

class Crypt {
  static async compare({
    src,
    hash,
  }) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(src, hash, (err, res: boolean) => {
        err && reject(err);
        resolve(res);
      });
    });
  }

  static hash({
    data,
    saltRound,
  }: HashParam) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, saltRound, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });  
    });
  }
};

export default Crypt;

export interface HashParam {
  data: string,
  saltRound: number,
};
