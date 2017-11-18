import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function insertTerm(trx, label: string, roman: string) {
  return db.transacting(trx)
    .into('Term')
    .insert({
      label: label,
      roman: roman,
      status: EntityCommonStatus.NORMAL
    });
};