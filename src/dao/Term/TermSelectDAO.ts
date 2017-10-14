import db from '../../database';
import { TermStatus } from '../../models/Status/TermStatus';

export function selectTermByLabel(label: string, offset?: number , limit?: number) {
  return db('Term').select('id', 'created_at')
    .where({
      status: TermStatus.NORMAL,
      label: label
    })
    .offset(offset)
    .limit(limit);
};

export function selectTermByIds(termIds: number[]) {
  return db('Term')
    .where({
      status: TermStatus.NORMAL
    })
    .whereIn('id', termIds)
    .select('id', 'label', 'roman', 'updated_at');
}
