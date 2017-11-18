import db from '../../database';
import { DefinitionStatus } from '../../models/Status/DefinitionStatus';

export function insertDefinition(trx, data: any, termId: number) {
  return db.transacting(trx)
    .into('Definition')
    .insert({
      label: data.label,
      status: DefinitionStatus.NORMAL,
      term_id: termId,
      user_id: '1', //TODO user 정보추가
      vote_id: '1', //TODO vote 정보넣고 업데이트
    });
};


export function insertDefinitionPos(trx, defId: number, posIds: Array<number>) {
  let input = [];
  posIds.forEach(val => {
    input.push({def_id: defId, pos_id: val});
  });

  return db.transacting(trx)
    .into('DefinitionPos')
    .insert(input);
}

export function insertDefinitionUsage(trx, defId: number, usageId: number) {
  return db.transacting(trx)
    .into('DefinitionUsage')
    .insert({
      def_id: defId,
      usage_id: usageId,
      status: DefinitionStatus.NORMAL
    });
}