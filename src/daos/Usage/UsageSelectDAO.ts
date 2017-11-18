import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function selectUsageByDefinitionId(defId: number) {
  return db('DefinitionUsage').where('DefinitionUsage.def_id',defId)
    .leftJoin('Usage', function() {
      this.on('Usage.id', '=','DefinitionUsage.usage_id');
    })
    .where('Usage.status', EntityCommonStatus.NORMAL)
    .select('Usage.id', 'Usage.label')
    .orderBy('Usage.no', 'asc');
};

