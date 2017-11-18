import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export function selectTermByLabel(label: string, offset?: number , limit?: number) {
  return db('Term').select('id', 'created_at')
    .where({
      status: EntityCommonStatus.NORMAL,
      label: label
    })
    .offset(offset)
    .limit(limit);
};

export function selectTermByIds(termIds: number[]) {
  return db('Term')
    .where({
      status: EntityCommonStatus.NORMAL
    })
    .whereIn('id', termIds)
    .select('id', 'label', 'roman', 'updated_at');
}
