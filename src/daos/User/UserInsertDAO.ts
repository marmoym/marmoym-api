import db from '@database/db';
import UserStatus from '@entities/enums/UserStatus';
import User from '@entities/User';

export function insertUser(trx, data: any, encodedPw: string) {
  return db.transacting(trx)
    .into(User._NAME)
    .insert({
      username: data.username,
      password: encodedPw,
      email: data.email,
      status: UserStatus.PENDING
    });
};
