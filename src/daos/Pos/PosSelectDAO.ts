import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function selectPosByDefinitionId (defId: number) {
  return db(Entity.DEFINITION_POS).where('DefinitionPos.def_id',defId)
    .leftJoin(Entity.POS, function() {
      this.on('Pos.id', '=','DefinitionPos.pos_id')
    })
    .where('Pos.status', EntityCommonStatus.NORMAL)
    .select('Pos.id', 'Pos.label', 'Pos.labelEn');
};
