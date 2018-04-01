import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Definition from '@entities/Definition';
import DefinitionPos from '@entities/DefinitionPos';
import DefinitionUsage from '@entities/DefinitionUsage';

export function insertDefinition(trx, data: any, termId: number) {
  return db.transacting(trx)
    .into(Definition._NAME)
    .insert({
      label: data.label,
      status: EntityCommonStatus.NORMAL,
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
    .into(DefinitionPos._NAME)
    .insert(input);
}

export function insertDefinitionUsage(trx, defId: number, usageId: number) {
  return db.transacting(trx)
    .into(DefinitionUsage._NAME)
    .insert({
      def_id: defId,
      usage_id: usageId,
      status: EntityCommonStatus.NORMAL
    });
}
