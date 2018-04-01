import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Term from '@entities/Term';

export function insertTerm(trx, label: string, roman: string) {
  return db.transacting(trx)
    .into(Term._NAME)
    .insert({
      label: label,
      roman: roman,
      status: EntityCommonStatus.NORMAL
    });
};