import db from '../../database';
import { DefinitionStatus } from '../../models/Status/DefinitionStatus';

export function selectDefinitionsByIds(ids: number[]) {
  return db('Definition').where({
      status: DefinitionStatus.NORMAL
    })
    .whereIn('id', ids)
    .select('id','label','term_id','user_id','vote_id','updated_at as updatedAt');
};

// export function selectRecentlyCreatedDefinitionsByTermId(termId: number, offset: number, limit: number) {
//   return db('Definition').where({
//       term_id: termId,
//       status: DefinitionStatus.NORMAL
//     })
//     .orderBy('created_at', 'desc')
//     .limit(limit)
//     .offset(Number(offset))
//     .select('id', 'label', 'vote_id', 'user_id');
// };

export function selectRecentlyCreatedDefinitionIds(offset: number, limit:number) {
  return db('Definition').where({
    status: DefinitionStatus.NORMAL
  })
  .select('id', 'updated_at as updatedAt')
  .limit(limit)
  .offset(Number(offset))
 
}

