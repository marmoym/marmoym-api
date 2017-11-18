import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function insertUsage(trx, label: string, no: number) {
  return db.transacting(trx)
    .into('Usage')
    .insert({
      label: label,
      no : no,
      status: EntityCommonStatus.NORMAL,
    });
};