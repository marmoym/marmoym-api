import db from '../../database';
import UserStatus from '@constants/Status/UserStatus';
import Entity from '@constants/Entity';

export function insertUser(trx, data: any, encodedPw: string) {
  return db.transacting(trx)
    .into(Entity.USER)
    .insert({
      username: data.username,
      password: encodedPw,
      email: data.email,
      status: UserStatus.PENDING
    });
};
