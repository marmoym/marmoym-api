import db from '@database/db';
import EntityCommonStatus from '@entities/enums/EntityCommonStatus';
import Term from '@entities/Term';

export function selectTermByLabel(label: string, offset?: number , limit?: number) {
  return db(Term._NAME).select('id', 'created_at')
    .where({
      status: EntityCommonStatus.NORMAL,
      label: label
    })
    .offset(offset)
    .limit(limit);
};

export function selectTermByIds(termIds: number[]) {
  return db(Term._NAME)
    .where({
      status: EntityCommonStatus.NORMAL
    })
    .whereIn('id', termIds)
    .select('id', 'label', 'roman', 'updated_at');
}
