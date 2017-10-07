import db from '../../database';

export function getPosByDefinitionId (defId: number) {
  return db('DefinitionPos').where('DefinitionPos.def_id',defId)
    .leftJoin('Pos', function() {
      this.on('Pos.id', '=','DefinitionPos.pos_id')
    })
    .where('Pos.status', 'N')
    .select('Pos.id', 'Pos.label', 'Pos.labelEn');
};

