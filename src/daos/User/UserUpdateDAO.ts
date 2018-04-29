import db from '@database/db';
import UserStatus from '@constants/Status/UserStatus';
import User from '@entities/User';

export function updateUserByUserId(trx, encodedPw: string, username: string, userId: number) {
  return db.transacting(trx)
    .into(User._NAME)
    .where({
      id: userId,
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .update({
      password: encodedPw,
      username: username
    });
};
