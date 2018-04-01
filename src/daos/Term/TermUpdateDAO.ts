import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';import Term from '@entities/Term';
;

export function updateTermOnlyUpdatedAt(trx, termId: number) {
  return db.transacting(trx)
    .into(Term._NAME)
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