import db from '../../database';
import { PosStatus } from '../../models/Status/PosStatus';

export function selectPosByDefinitionId (defId: number) {
  return db('DefinitionPos').where('DefinitionPos.def_id',defId)
    .leftJoin('Pos', function() {
      this.on('Pos.id', '=','DefinitionPos.pos_id')
    })
    .where('Pos.status', PosStatus.NORMAL)
    .select('Pos.id', 'Pos.label', 'Pos.labelEn');
};

