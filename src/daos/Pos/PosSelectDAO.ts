import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import DefinitionPos from '@entities/DefinitionPos';
import Pos from '@entities/Pos';

export function selectPosByDefinitionId (defId: number) {
  return db(DefinitionPos._NAME).where('DefinitionPos.def_id',defId)
    .leftJoin(Pos._NAME, function() {
      this.on('Pos.id', '=','DefinitionPos.pos_id')
    })
    .where('Pos.status', EntityCommonStatus.NORMAL)
    .select('Pos.id', 'Pos.label', 'Pos.labelEn');
};
