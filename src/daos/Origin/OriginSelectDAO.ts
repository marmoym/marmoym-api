import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function selectOriginByDefinitionId (defId: number) {
  return db('Origin').where({
    def_id: defId,
    status: EntityCommonStatus.NORMAL
  })
  .select('label')
  .orderBy('created_at', 'desc');
};

