import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function updateTermOnlyUpdatedAt(trx, termId: number) {
  return db.transacting(trx)
    .into('Term')
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