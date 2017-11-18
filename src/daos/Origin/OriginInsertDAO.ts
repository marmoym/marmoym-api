import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function insertOrigin(trx, label: string, defId: number) {
  return db.transacting(trx)
    .into(Entity.ORIGIN)
    .insert({
      label: label,
      def_id : defId,
      status: EntityCommonStatus.NORMAL
    });
};
