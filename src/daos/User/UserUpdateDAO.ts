import db from '../../database';
import UserStatus from '@constants/Status/UserStatus';

export function updateUserByUserId(trx, encodedPw: string, username: string, userId: number) {
  return db.transacting(trx)
    .into(Entity.USER)
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
