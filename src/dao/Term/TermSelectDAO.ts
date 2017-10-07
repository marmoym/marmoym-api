import db from '../../database';
import { TermStatus } from '../../models/TermStatus';

export function getTermByLabel (label: string) {
  return db('Term').select()
    .where({
      label: label
    });
};

export function getRecentUpdatedTerm (offset: number) {
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
