import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function insertTerm(trx, label: string, roman: string) {
  return db.transacting(trx)
    .into(Entity.TERM)
    .insert({
      label: label,
      roman: roman,
      status: EntityCommonStatus.NORMAL
    });
};