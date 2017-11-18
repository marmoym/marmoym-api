import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function selectPosByDefinitionId (defId: number) {
  return db('DefinitionPos').where('DefinitionPos.def_id',defId)
    .leftJoin('Pos', function() {
      this.on('Pos.id', '=','DefinitionPos.pos_id')
    })
    .where('Pos.status', EntityCommonStatus.NORMAL)
    .select('Pos.id', 'Pos.label', 'Pos.labelEn');
};

