import db from '../../database';

export function getUsageByDefinitionId (defId: number) {
  return db('DefinitionUsage').where('DefinitionUsage.def_id',defId)
    .leftJoin('Usage', function() {
      this.on('Usage.id', '=','DefinitionUsage.usage_id');
    })
    .where('Usage.status', 'N')
    .select('Usage.id', 'Usage.label')
    .orderBy('Usage.no', 'asc');
};

