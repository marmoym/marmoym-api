import db from '@database/db';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Usage from '@entities/Usage';

export function insertUsage(trx, label: string, no: number) {
  return db.transacting(trx)
    .into(Usage._NAME)
    .insert({
      label: label,
      no : no,
      status: EntityCommonStatus.NORMAL,
    });
};
