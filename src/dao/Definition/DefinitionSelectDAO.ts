import db from '../../database';
import { DefinitionStatus } from '../../models/Status/DefinitionStatus';

export function selectDefinitionsByTermId(termId: number) {
  return db('Definition').where({
      term_id: termId,
      status: DefinitionStatus.NORMAL
    })
    .select();
};

export function selectRecentlyCreatedDefinitionsByTermId(termId: number, offset: number, limit: number) {
  return db('Definition').where({
      term_id: termId,
      status: DefinitionStatus.NORMAL
    })
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(Number(offset))
    .select('id', 'label', 'vote_id', 'user_id');
};

