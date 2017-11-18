import db from '../../database';
import { OriginStatus } from '../../models/Status/OriginStatus';

export function selectOriginByDefinitionId (defId: number) {
  return db('Origin').where({
    def_id: defId,
    status: OriginStatus.NORMAL
  })
  .select('label')
  .orderBy('created_at', 'desc');
};

