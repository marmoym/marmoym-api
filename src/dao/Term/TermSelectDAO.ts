import db from '../../database';
import { TermStatus } from '../../models/Status/TermStatus';

export function selectTermByLabel(label: string) {
  return db('Term').select()
    .where({
      label: label
    });
};

export function selectRecentlyUpdatedTerm(offset: number) {
  // return db('Term').orderBy('Term.updated_at', 'desc')
  //   .innerJoin(db('Definition').orderBy('Definition.created_at','desc').as('Definition'), function () {
  //     this.on('Definition.term_id', '=', 'Term.id')
  //   })
  //   .select('Term.id  as termId', 'Term.label as termLabel', 'Term.roman as termRoman', 'Definition.id as defId', 'Definition.label as defLabel', 'Definition.created_at as defCreatedAt')
  //   .limit(5)
  //   .offset(Number(offset));
  return db('Term').orderBy('Term.updated_at', 'desc')
    .whereNot({
      status: TermStatus.DELETED
    })
    .select('Term.id  as termId', 'Term.label as term', 'Term.roman as termRoman')
    .limit(5)
    .offset(Number(offset));
};

export function selectTermByIds(termIds: number[]) {
  return db('Term').select('Term.id  as termId', 'Term.label as term', 'Term.roman as termRoman')
    .where({
      status: TermStatus.NORMAL
    })
    .whereIn('id', termIds)
    .select('id', 'label', 'updated_at as updatedAt');
}
