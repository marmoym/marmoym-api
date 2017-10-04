import db from '../../database';
import { createDefinition } from '../../models/common/Definition'; 

export const insertDefinition = (trx, data: any, termId: number) => {
  return db.transacting(trx)
    .into('Definition')
    .insert({
      label: data.label,
      status: 'N',
      term_id: termId,
      user_id: '1', //TODO user 정보추가
      vote_id: '1', //vote 정보넣고 업데이트
    });
};


export const insertDefinitionPos = (trx, defId: number, posIds: Array<number>) => {
  let input = [];
  posIds.forEach(val => {
    input.push({def_id: defId, pos_id: val});
  });
  return db.transacting(trx)
    .into('DefinitionPos')
    .insert(input)
}

export const insertDefinitionUsage = (trx, defId: number, usageId: number) => {
  return db.transacting(trx)
    .into('DefinitionUsage')
    .insert({
      def_id: defId,
      usage_id: usageId,
      status: 'N'
    })
}