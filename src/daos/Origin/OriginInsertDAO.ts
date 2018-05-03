import db from '@database/db';
import EntityCommonStatus from '@entities/enums/EntityCommonStatus';
import Origin from '@entities/Origin';

export function insertOrigin(trx, label: string, defId: number) {
  return db.transacting(trx)
    .into(Origin._NAME)
    .insert({
      label: label,
      def_id : defId,
      status: EntityCommonStatus.NORMAL
    });
};
