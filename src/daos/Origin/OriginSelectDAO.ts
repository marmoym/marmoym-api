import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function selectOriginByDefinitionId (defId: number) {
  return db(Entity.ORIGIN).where({
    def_id: defId,
    status: EntityCommonStatus.NORMAL
  })
  .select('label')
  .orderBy('created_at', 'desc');
};
