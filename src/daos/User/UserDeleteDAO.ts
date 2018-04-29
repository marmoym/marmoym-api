import db from '@database/db';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import User from '@entities/User';

export function deleteUserByUserId(trx, userId: number) {
  return db.transacting(trx)
    .into(User._NAME)
    .where({
      id: userId,
    })
    .whereNot({
      status: EntityCommonStatus.DELETED
    })
    .update({
      status: EntityCommonStatus.DELETED
    });
};
