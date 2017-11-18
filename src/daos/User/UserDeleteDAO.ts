import db from '../../database';
import { UserStatus } from "../../models/Status/UserStatus";

export function deleteUserByUserId(trx, userId: number) {
  return db.transacting(trx)
    .into('User')
    .where({
      id: userId,
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .update({
      status: UserStatus.DELETED
    });
};