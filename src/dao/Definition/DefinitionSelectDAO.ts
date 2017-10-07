import db from '../../database';

export function getDefinitionsByTermId (termId: number) {
  return db('Definition').where({
      term_id: termId
    })
    .select();
};

export function getRecentCreatedDefinitionsByTermId (termId: number, offset: number, limit: number) {
  return db('Definition').where({
      term_id: termId
    })
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset)
    .select('id', 'label', 'vote_id', 'user_id');
};

