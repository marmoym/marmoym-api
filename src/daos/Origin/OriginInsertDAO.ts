import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function insertOrigin(trx, label: string, defId: number) {
  return db.transacting(trx)
    .into('Origin')
    .insert({
      label: label,
      def_id : defId,
      status: EntityCommonStatus.NORMAL
    });
};