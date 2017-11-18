import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function selectUsageByDefinitionId(defId: number) {
  return db(Entity.DEFINITION_USAGE).where('DefinitionUsage.def_id',defId)
    .leftJoin(Entity.USAGE, function() {
      this.on('Usage.id', '=','DefinitionUsage.usage_id');
    })
    .where('Usage.status', EntityCommonStatus.NORMAL)
    .select('Usage.id', 'Usage.label')
    .orderBy('Usage.no', 'asc');
};
