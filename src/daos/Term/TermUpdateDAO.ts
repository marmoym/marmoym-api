import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function updateTermOnlyUpdatedAt(trx, termId: number) {
  return db.transacting(trx)
    .into(Entity.TERM)
    .where({
      id: termId,
    })
    .whereNot({
      status: EntityCommonStatus.DELETED
    })
    .update({
      updated_at: db.fn.now()
    });
};