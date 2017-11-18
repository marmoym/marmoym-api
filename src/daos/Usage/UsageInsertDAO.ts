import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function insertUsage(trx, label: string, no: number) {
  return db.transacting(trx)
    .into(Entity.USAGE)
    .insert({
      label: label,
      no : no,
      status: EntityCommonStatus.NORMAL,
    });
};
