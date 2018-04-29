import db from '@database/db';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import DefinitionUsage from '@entities/DefinitionUsage';
import Usage from '@entities/Usage';

export function selectUsageByDefinitionId(defId: number) {
  return db(DefinitionUsage._NAME).where('DefinitionUsage.def_id',defId)
    .leftJoin(Usage._NAME, function() {
      this.on('Usage.id', '=','DefinitionUsage.usage_id');
    })
    .where('Usage.status', EntityCommonStatus.NORMAL)
    .select('Usage.id', 'Usage.label')
    .orderBy('Usage.no', 'asc');
};
