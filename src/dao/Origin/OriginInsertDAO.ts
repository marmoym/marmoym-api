import db from '../../database';
import { OriginStatus } from '../../models/Status/OriginStatus';

export function insertOrigin(trx, label: string, defId: number) {
  return db.transacting(trx)
    .into('Origin')
    .insert({
      label: label,
      def_id : defId,
      status: OriginStatus.NORMAL
    });
};