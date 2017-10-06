import db from '../../database';
import { UserStatus } from "../../models/UserStatus";

export const deleteUserByUserId = (trx, userId: number) => {
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