import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function deleteUserByUserId(trx, userId: number) {
  return db.transacting(trx)
    .into('User')
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