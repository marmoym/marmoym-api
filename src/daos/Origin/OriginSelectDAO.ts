import db from '@database/db';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Origin from '@entities/Origin';

export function selectOriginByDefinitionId (defId: number) {
  return db(Origin._NAME).where({
    def_id: defId,
    status: EntityCommonStatus.NORMAL
  })
  .select('label')
  .orderBy('created_at', 'desc');
};
