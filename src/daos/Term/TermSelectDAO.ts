import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Entity from '@constants/Entity';

export function selectTermByLabel(label: string, offset?: number , limit?: number) {
  return db(Entity.TERM).select('id', 'created_at')
    .where({
      status: EntityCommonStatus.NORMAL,
      label: label
    })
    .offset(offset)
    .limit(limit);
};

export function selectTermByIds(termIds: number[]) {
  return db(Entity.TERM)
    .where({
      status: EntityCommonStatus.NORMAL
    })
    .whereIn('id', termIds)
    .select('id', 'label', 'roman', 'updated_at');
}
