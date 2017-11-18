import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function deleteUserByUserId(trx, userId: number) {
  return db.transacting(trx)
    .into(Entity.USER)
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
